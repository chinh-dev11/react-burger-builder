import { put, delay } from 'redux-saga/effects';
import axios from 'axios'; // not using the custom axios (axios.orders)

import * as actions from '../actions/index';

const fireBaseConfig = {
    apiKey: 'AIzaSyD2sgqSrt0PvhkbmGYfSr3xru8guq1pQJo',
    reqUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty' // Rest API
};

const localStorageKeys = {
    tokenId: 'bbTokenId',
    tokenExpiredDate: 'bbTokenExpiredDate'
};

// REM: function*: generators, next generation JS feature, are functions which can be executed incrementally. They can be paused during function's execution, for example to wait for async code to finish
export function* logoutSaga(action) {
    // REM: localStorage can be accessed by XSS (Cross-Site Scripting), but it's prevented by React/Angular
    // yield (next-gen JS): execute and wait for code termination before executing the next line of code
    yield localStorage.removeItem(localStorageKeys.tokenId);
    yield localStorage.removeItem(localStorageKeys.tokenExpiredDate);

    // put: dispatch an action
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime); // delay (as setTimeout) before executing next line of code 
    yield put(actions.logout()); // dispatch an action
}

export function* authUserSaga(action) {
    // dispatch(authStart());
    yield put(actions.authStart());

    /**
     * Ref: https://firebase.google.com/docs/reference/rest/auth
     * Endpoints
     *      Sign Up: https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
     *                  ref: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
     *      Sign In: https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
     *                  ref: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
     * API_KEY: AIzaSyD2sgqSrt0PvhkbmGYfSr3xru8guq1pQJo (Project Settings page - https://console.firebase.google.com/project/react-burger-builder-f2419/settings/general/)
     */
    // const apiKey = 'AIzaSyD2sgqSrt0PvhkbmGYfSr3xru8guq1pQJo';
    // const reqUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
    const endPoint = action.isSignUp ? '/signupNewUser' : '/verifyPassword'; // Sign Up / Sign In
    const payload = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    const reqConfig = {
        url: fireBaseConfig.reqUrl + endPoint + '?key=' + fireBaseConfig.apiKey,
        data: payload,
        method: 'post'
    };

    // REM: replacing 'then' with yield (next-gen JS)
    /**
     * axios: returns a promise
     * yield: waits until it gets the response|error, hence no longer require 'then' to execute the inner code (const expiresInMillisecs...), but instead it will execute the following code once 'res' is resolved
     */
    // axios(reqConfig)
    try {
        const res = yield axios(reqConfig);
        /* 
        .then(res => {
            // res.data.expiresIn = 30;
            const expiresInMillisecs = res.data.expiresIn * 1000; // REM: transform expiresIn to milliseconds to use in JS environment; setTimeout, Date,... work in millisecs
            const expiredDate = new Date(Date.now() + expiresInMillisecs); // Fri May 24 2019 12:30:23 GMT-0400 (GMT-04:00)

            // REM: localStorage can be accessed by XSS (Cross-Site Scripting), but it's prevented by React/Angular
            localStorage.setItem(localStorageKeys.tokenId, res.data.idToken);
            localStorage.setItem(localStorageKeys.tokenExpiredDate, expiredDate);

            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(expiresInMillisecs));
        }) 
        */
        const expiresInMillisecs = yield res.data.expiresIn * 1000; // REM: transform expiresIn to milliseconds to use in JS environment; setTimeout, Date,... work in millisecs
        const expiredDate = yield new Date(Date.now() + expiresInMillisecs); // Fri May 24 2019 12:30:23 GMT-0400 (GMT-04:00)

        // REM: localStorage can be accessed by XSS (Cross-Site Scripting), but it's prevented by React/Angular
        yield localStorage.setItem(localStorageKeys.tokenId, res.data.idToken);
        yield localStorage.setItem(localStorageKeys.tokenExpiredDate, expiredDate);

        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeout(expiresInMillisecs));
    } catch (err) {
        /* 
        .catch(err => {
            // console.log('err: ', err);
            dispatch(authFail(err));
        });
        */
        yield put(actions.authFail(err));
    }
}

export function* authCheckStateSaga() {
    const tokenStored = localStorage.getItem(localStorageKeys.tokenId);
    const expiredDateStored = (new Date(localStorage.getItem(localStorageKeys.tokenExpiredDate)).getTime()); // transform tokenExpiredDate string into millisecs with getTime() of Date object
    const expirationTime = expiredDateStored - Date.now();

    // REM: authSuccess() requires 'idToken' and 'localId' (see authSuccess() in auth reducer)
    // Solutions:
    /* 
        1) store 'localId' in localStorage, as with 'idToken', in auth() above, and passing by getting them from localStorage when dispatching authSuccess() as:
            dispatch(authSuccess(localStorage.getItem('bbTokenId'), localStorage.getItem('bbLocalId'));
            * Remember to remove 'localId' from localStorage when logout()
    
        2) Getting the user data from Firebase Rest API as follow:
        */
    /**
     * Get user data
     * https://firebase.google.com/docs/reference/rest/auth#section-get-account-info
     * Endpoint: https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=[API_KEY] 
     *  */
    if (tokenStored && expirationTime > 0) { // auto signin
        const endPoint = '/getAccountInfo';
        const payload = {
            idToken: tokenStored
        };
        const reqConfig = {
            url: fireBaseConfig.reqUrl + endPoint + '?key=' + fireBaseConfig.apiKey,
            data: payload,
            method: 'post'
        };

        // REM: replacing 'then' with yield (next-gen JS)
        /**
         * axios: returns a promise
         * yield: waits until it gets the response|error, hence no longer require 'then' to execute the inner code (authSuccess(tokenStored,...), but instead it will execute the following code once 'res' is resolved
         */
        // axios(reqConfig)
        try {
            const res = yield axios(reqConfig);
            // .then(res => {
            // console.log('res: ', res);
            yield put(actions.authSuccess(tokenStored, res.data.users[0].localId));
            yield put(actions.checkAuthTimeout(expirationTime));
        } catch (err) {
            // .catch(err => {
            // console.log('err: ', err);
            yield put(actions.authFail(err));
        }
    } else { // auto signout
        yield put(actions.logout());
    }
}
import axios from 'axios';

import * as actionTypes from './actionTypes';

const fireBaseConfig = {
    apiKey: 'AIzaSyD2sgqSrt0PvhkbmGYfSr3xru8guq1pQJo',
    reqUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty' // Rest API
};

const localStorageKeys = {
    tokenId: 'bbTokenId',
    tokenExpiredDate: 'bbTokenExpiredDate'
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, localId) => {
    // console.log('idToken, localId: ', idToken, localId);
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId
    };
};

export const authFail = (error) => {
    // console.log('error: ', error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    // console.log('logout()');
    // REM: localStorage can be accessed by XSS (Cross-Site Scripting), but it's prevented by React/Angular
    // localStorage.removeItem(localStorageKeys.tokenId);
    // localStorage.removeItem(localStorageKeys.tokenExpiredDate);
    return {
        // type: actionTypes.AUTH_LOGOUT
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

//* expirationTime is in milliseconds
export const checkAuthTimeout = (expirationTime) => {
    /* return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }; */
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
};

export const auth = (email, password, isSignUp) => {
    // console.log('email, password, isSignUp: ', email, password, isSignUp);
    return dispatch => {
        dispatch(authStart());

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
        const endPoint = isSignUp ? '/signupNewUser' : '/verifyPassword'; // Sign Up / Sign In
        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        const reqConfig = {
            url: fireBaseConfig.reqUrl + endPoint + '?key=' + fireBaseConfig.apiKey,
            data: payload,
            method: 'post'
        };

        axios(reqConfig)
            .then(res => {
                // console.log('res: ', res);
                // res.data.expiresIn = 30;
                const expiresInMillisecs = res.data.expiresIn * 1000; // REM: transform expiresIn to milliseconds to use in JS environment; setTimeout, Date,... work in millisecs
                const expiredDate = new Date(Date.now() + expiresInMillisecs); // Fri May 24 2019 12:30:23 GMT-0400 (GMT-04:00)

                // REM: localStorage can be accessed by XSS (Cross-Site Scripting), but it's prevented by React/Angular
                localStorage.setItem(localStorageKeys.tokenId, res.data.idToken);
                localStorage.setItem(localStorageKeys.tokenExpiredDate, expiredDate);

                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(expiresInMillisecs));
            })
            .catch(err => {
                // console.log('err: ', err);
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const tokenStored = localStorage.getItem(localStorageKeys.tokenId);
        const expiredDateStored = (new Date(localStorage.getItem(localStorageKeys.tokenExpiredDate)).getTime()); // transform tokenExpiredDate string into millisecs with getTime() of Date object
        const expirationTime = expiredDateStored - Date.now();

        if (!tokenStored || expirationTime <= 0) {
            dispatch(logout());
        } else {
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
            const endPoint = '/getAccountInfo';
            const payload = {
                idToken: tokenStored
            };
            const reqConfig = {
                url: fireBaseConfig.reqUrl + endPoint + '?key=' + fireBaseConfig.apiKey,
                data: payload,
                method: 'post'
            };
            axios(reqConfig)
                .then(res => {
                    // console.log('res: ', res);
                    dispatch(authSuccess(tokenStored, res.data.users[0].localId));
                    dispatch(checkAuthTimeout(expirationTime));
                })
                .catch(err => {
                    // console.log('err: ', err);
                    dispatch(authFail(err));
                });
        }
    }
}
import axios from 'axios'; // not using the custom axios (axios.orders)

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
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
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
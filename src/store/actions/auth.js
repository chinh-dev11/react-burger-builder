// import axios from 'axios'; // not using the custom axios (axios.orders)

import * as actionTypes from './actionTypes';

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
    // REM - localStorage can be accessed by XSS (Cross-Site Scripting), but it's prevented by React/Angular
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
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};
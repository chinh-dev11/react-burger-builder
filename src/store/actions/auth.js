import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expiresIn) => {
    // console.log('expiresIn: ', expiresIn);
    // expiresIn: only avail with signup, of 3600 secs by default in Firebase, but not signin                
    const expirationTime = expiresIn ? expiresIn : 3600; // default value if not avail (as for signin)
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); // setTimeout (millisecs) and expirationTime (secs) therefore 3600 * 1000 to transform to millisecs
    };
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
        const apiKey = 'AIzaSyD2sgqSrt0PvhkbmGYfSr3xru8guq1pQJo';
        const req = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
        const endPoint = isSignUp ? 'signupNewUser' : 'verifyPassword'; // Sign Up / Sign In
        // const endPoint = 'verifyPassword'; // Sign In
        const authReq = req + endPoint + '?key=' + apiKey;
        const body = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(authReq, body)
            .then(response => {
                // console.log('response: ', response);
                dispatch(authSuccess(response.data));

                // expiresIn: only avail with signup, of 3600 secs by default in Firebase, but not signin                
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                // console.log('err: ', err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

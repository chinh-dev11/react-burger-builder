import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state) => {
    const newState = {
        error: null,
        loading: true
    };
    return updateObject(state, newState);
};

const authSuccess = (state, action) => {
    // console.log('action: ', action);
    const newState = {
        token: action.idToken,
        userId: action.localId,
        error: null,
        loading: false,
    };
    return updateObject(state, newState);
};

const authFail = (state, action) => {
    const newState = {
        error: action.error,
        loading: false
    };
    return updateObject(state, newState);
};

const authLogout = (state) => {
    const newState = {
        token: null,
        userId: null,
        error: null,
        loading: false
    };
    return updateObject(state, newState);
};

const setAuthRedirectPath = (state, action) => {
    const newState = {
        authRedirectPath: action.path
    };
    return updateObject(state, newState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PURCHASE:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
                purchased: false,
                error: false
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true,
                error: false
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                purchased: false,
                error: true
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
                error: false
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                // orders: state.orders.concat(action.orders),
                orders: action.orders,
                loading: false,
                error: false
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
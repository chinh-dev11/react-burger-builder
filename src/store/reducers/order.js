import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: false
};

const initPurchase = (state, action) => {
    /* return {
        ...state,
        purchased: false
    }; */
    const updatedState = {
        purchased: false
    };
    return updateObject(state, updatedState);
};

const purchaseBurgerStart = (state, action) => {
    /* return {
        ...state,
        loading: true,
        purchased: false,
        error: false
    }; */
    const updatedState = {
        loading: true,
        purchased: false,
        error: false
    };
    return updateObject(state, updatedState);
};

const purchaseBurgerSuccess = (state, action) => {
    /* const newOrder = {
        ...action.orderData,
        id: action.orderId
    }; */
    /* return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
        error: false
    }; */
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    const updatedState = {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
        error: false
    };
    return updateObject(state, updatedState);
};

const purchaseBurgerFail = (state, action) => {
    /* return {
        ...state,
        loading: false,
        purchased: false,
        error: true
    }; */
    const updatedState = {
        loading: false,
        purchased: false,
        error: true
    };
    return updateObject(state, updatedState);
};

const fetchOrdersStart = (state, action) => {
    /* return {
        ...state,
        loading: true,
        error: false
    }; */
    const updatedState = {
        loading: true,
        error: false
    };
    return updateObject(state, updatedState);
};

const fetchOrdersSuccess = (state, action) => {
    /* return {
        ...state,
        orders: action.orders,
        loading: false,
        error: false
    }; */
    const updatedState = {
        orders: action.orders,
        loading: false,
        error: false
    };
    return updateObject(state, updatedState);
};

const fetchOrdersFail = (state, action) => {
    /* return {
        ...state,
        loading: false,
        error: action.error
    }; */
    const updatedState = {
        loading: false,
        error: action.error
    };
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PURCHASE: return initPurchase(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state,action);
        default: return state;
    }
};

export default reducer;
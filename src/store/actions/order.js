import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart()); // to have a spinner whilst posting orders request

        // extension .json is required for Firebase
        axios.post('/orders.json', orderData)
            .then((response) => {
                // console.log('[ContactData] post response: ', response);
                // this.props.history.push('/'); // to root home page after placing order succeed
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                // console.log('[ContactData] post error: ', error);
                dispatch(purchaseBurgerFail());
            });
    };
};
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const validateToken = (token) => {
    return token ? token : window.localStorage.getItem('bbIdToken');
};

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

export const purchaseBurger = (orderData, token) => {
    const reqConfig ={
        url: '/orders.json?auth=' + validateToken(token),
        data: orderData,
        method: 'post'
    }

    return dispatch => {
        dispatch(purchaseBurgerStart()); // to have a spinner whilst posting orders request

        // extension .json is required for Firebase
        // axios.post('/orders.json?auth=' + authToken, orderData)
        axios(reqConfig)
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

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrders = (token) => {
    /**
     * Passing the token to the request
        1) with the dispatch/state arguments - NOT RECOMMENDED
            return (dispatch, state) => {
                dispatch(fetchOrdersStart());
                ...
            }
        2) passing token as fetchOrders argument
            export const fetchOrders = (token) => {...}
     */
    const reqConfig = {
        url: '/orders.json?auth=' + validateToken(token),
        // url: '/orders.json',
        // auth: authToken // REM: Firebase requires auth param in the url
        method: 'get',
    };

    return dispatch => {
        dispatch(fetchOrdersStart());

        axios(reqConfig)
            .then(res => {
                // console.log('res: ', res);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key], // flatten object to key-value pair
                        id: key
                    });
                }
                // console.log(fetchedOrders);
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                // console.log('err: ', err);
                dispatch(fetchOrdersFail(err));
            });
    };
};

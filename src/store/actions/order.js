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

export const fetchOrders = () => {
    
    return dispatch => {
        dispatch(fetchOrdersStart());

        axios.get('/orders.json')
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
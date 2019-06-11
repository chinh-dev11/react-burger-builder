import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* ordersFetchSaga(action) {
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
    const queryParams = {
        auth: 'auth=' + action.token,
        orderBy: 'orderBy="userId"', // orderBy must be a valid JSON encoded path (as a string)
        equalTo: 'equalTo="' + action.userId + '"' // Constraint index field must be a JSON primitive (as a string)
    };
    // Firebase Console
    // Index not defined, add ".indexOn": "userId", for path "/orders", to the rules
    /* {
        "rules": {
          "ingredients": {
            ".read": true,
            ".write": true
          },
          "orders": {
            ".read": "auth != null",
            ".write": "auth != null",
            ".indexOn": "userId"
          },
        }
      } */
    const reqConfig = {
        url: '/orders.json?' + queryParams.auth + '&' + queryParams.orderBy + '&' + queryParams.equalTo,
        // url: '/orders.json',
        // auth: authToken // REM: Firebase requires auth param in the url
        method: 'get',
    };
    // https://react-burger-builder-f2419.firebaseio.com/orders.json?auth=eyJ...&orderBy="userId"&equalTo="ZFP85PgI76gKVfMGPqqidK86Z242"
    /* return dispatch => {
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
    }; */
    yield put(actions.fetchOrdersStart());

    try {
        const res = yield axios(reqConfig);
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key], // flatten object to key-value pair
                id: key
            });
        }
        // console.log('fetchedOrders: ', fetchedOrders);
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        // console.log('err: ', err);
        yield put(actions.fetchOrdersFail(err));
    }
}

export function* purchaseBurgerSaga(action) {
    const reqConfig = {
        url: '/orders.json?auth=' + action.token,
        data: action.orderData,
        method: 'post'
    }

    /* return dispatch => {
        dispatch(purchaseBurgerStart()); // to have a spinner whilst posting orders request

        // extension .json is required for Firebase
        // axios.post('/orders.json?auth=' + authToken, orderData)
        axios(reqConfig)
            .then((res) => {
                // console.log('[ContactData] post res: ', res);
                // this.props.history.push('/'); // to root home page after placing order succeed
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch((error) => {
                // console.log('[ContactData] post error: ', error);
                dispatch(purchaseBurgerFail());
            });
    }; */
    yield put(actions.purchaseBurgerStart()); // to have a spinner whilst posting orders request
    const res = yield axios(reqConfig);
    try {
        // console.log('[ContactData] post res: ', res);
        // this.props.history.push('/'); // to root home page after placing order succeed
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
    } catch (err) {
        // console.log('[ContactData] post err: ', err);
        yield put(actions.purchaseBurgerFail());
    }
}
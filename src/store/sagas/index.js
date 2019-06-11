// takeEvery: allow to listen to actions and do something when they're occurred
import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { ordersFetchSaga, purchaseBurgerSaga } from './order';
import { initIngredientsSaga } from './burgerBuilder';

// REM: function*: generators, next generation JS feature, are functions which can be executed incrementally. They can be paused during function's execution, for example to wait for async code to finish
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);

}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.ORDERS_FETCH, ordersFetchSaga);
}
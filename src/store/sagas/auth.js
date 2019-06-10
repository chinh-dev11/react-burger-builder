import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions/index';

const localStorageKeys = {
    tokenId: 'bbTokenId',
    tokenExpiredDate: 'bbTokenExpiredDate'
};

// REM: function*: generators, next generation JS feature, are functions which can be executed incrementally. They can be paused during function's execution, for example to wait for async code to finish
export function* logoutSaga(action) {
    // REM: localStorage can be accessed by XSS (Cross-Site Scripting), but it's prevented by React/Angular
    // yield: execute and wait for code termination before execute the next line of code
    yield localStorage.removeItem(localStorageKeys.tokenId);
    yield localStorage.removeItem(localStorageKeys.tokenExpiredDate);

    // put: dispatch an action
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime); // delay (as setTimeout) before executing next line of code 
    yield put(actions.logout()); // dispatch an action
}
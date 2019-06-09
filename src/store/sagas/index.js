// takeEvery: allow to listen to actions and do something when they're occurred
import {takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga} from './auth';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
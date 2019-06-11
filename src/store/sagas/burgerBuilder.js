import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* initIngredientsSaga() {
    try {
        const res = yield axios.get('/ingredients.json');
        // console.log('[BurgerBuilder] componentDidMount get res: ', res);
        yield put(actions.setIngredients(res.data));
    } catch (err) {
        // console.log('[BurgerBuilder] componentDidMount get err: ', err);
        yield put(actions.fetchIngredientsFailed());
    }
}
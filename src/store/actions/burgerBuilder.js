import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removedIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    };
};

export const initIngredients = () => {
    // REM - moved to initIngredientsSaga() using redux-saga
    /* return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                // console.log('[BurgerBuilder] componentDidMount get res: ', res);
                dispatch(setIngredients(res.data));
            })
            .catch(error => { // REM - without catching error, the app will break if error occurred bc data of res (setState above) would be undefined (browser error: Unhandled Rejection (TypeError): Cannot read property 'data' of undefined)
                // console.log('[BurgerBuilder] componentDidMount get error: ', error);
                dispatch(fetchIngredientsFailed());
            });
    }; */
    return {
        type: actionTypes.INIT_INGREDIENTS
    };
};
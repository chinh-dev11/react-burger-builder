import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredient = (state, action) => {
    /* return {
        ...state,
        ingredients: {
            ...state.ingredients, // deep cloning
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }; */
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    /* return {
        ...state,
        ingredients: {
            ...state.ingredients, // deep cloning
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }; */
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    // return {
    //     ...state,
    //     ingredients: action.ingredients,
    //     // OPTIONAL: since Firebase DB is alphabetically sorted (bacon, cheese, meat, salad) and can't be changed, therefore we could manually change the order here, if needed, as follow (though it's not RECOMMENDED since it makes the app inflexible; in case of added/removed ingredient in DB, we will have to adjust the code here)
    //     /* ingredients: {
    //         salad: action.ingredients.salad,
    //         bacon: action.ingredients.bacon,
    //         cheese: action.ingredients.cheese,
    //         meat: action.ingredients.meat
    //     }, */
    //     totalPrice: 4,
    //     error: false
    // };
    const updatedState = {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    };
    return updateObject(state, updatedState);
};

const fetchIngredientsFail = (state, action) => {
    /* return {
        ...state,
        error: true
    } */
    const updatedState = {
        error: true
    };
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action);
        default: return state;
    }
};

export default reducer;
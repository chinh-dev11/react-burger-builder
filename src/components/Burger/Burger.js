import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    // console.log('[Burger] ', props);
    /**
     * state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 1
        }
    };
     * Object.keys(props.ingredients): ["salad", "bacon", "cheese", "meat"]
     * Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])]
     * }: [Array(1), Array(1), Array(2), Array(1)]
     */
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            // console.log('igKey: ', igKey);
            // console.log('Array(props.ingredients[igKey]): ', Array(props.ingredients[igKey]));
            // console.log('[...Array(props.ingredients[igKey])]: ', [...Array(props.ingredients[igKey])]);
            // [Array(1), Array(1), Array(2), Array(1)]
            return [...Array(props.ingredients[igKey])].map((newKey, i) => {
                // console.log('igKey: ', igKey);
                // console.log('newKey: ', newKey);
                // console.log('i: ', i);
                return <BurgerIngredient key={igKey + i} type={igKey}/>; // transforming the ingredients object into an array
            });
        })
        /**
         * state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            }
        };
         */
        // flatten the ingredients object and concat into an array to know if object is empty
        .reduce((arr, el) => {
            // console.log('arr: ', arr);
            // console.log('el: ', el);
            return arr.concat(el);
        }, []);
    
    // console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {/* <BurgerIngredient type="cheese"/> */}
            {/* <BurgerIngredient type="meat"/> */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    // console.log(typeof props.price); // price already converted to number in Checkout before posting it to server
    // console.log(props.ingredients);
    let ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    // console.log(ingredients);

    const ingredientsOuput = ingredients.map(ingredient => {
        return (
            <span
                key={ingredient.name}
                style={{
                    display: 'inline-block',
                    textTransform: 'capitalize',
                    border: '1px solid #ccc',
                    padding: '5px',
                    margin: '0 2px'
                }}>
                {ingredient.name} ({ingredient.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOuput}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
            {/* REM: Use Number.parseFloat {Number.parseFloat(props.price).toFixed(2)} to convert price string to a number as below */}
            {/* <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p> */}
            {/* REM: Or add plus sign (+) to the price in Orders.js before passing it */}
        </div>
    );
}

export default order;
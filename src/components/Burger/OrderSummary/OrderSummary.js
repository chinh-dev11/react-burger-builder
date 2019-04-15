import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummanry = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return (
                <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}</li>
            );
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientsSummary}</ul>
            <p>Total: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummanry;
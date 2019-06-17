import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

//
// ─── CLASS-BASED COMPONENT ───────────────────────────────────────────────────────
//

const orderSummary = props => {
// class OrderSummary extends Component {
    /**
     * Converted the OrderSummary to class-based component to add componentWillUpdate Hook to check if it gets re-rendering, but it does not need to be class-based component since the re-rendering validation hook componentShouldUpdate() is in Modal.js
     * The OrderSummary is left as class-based component with componentWillUpdate Hook for debugging purposes
     */
    /* componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate'); // REM: performance improvement: the OrderSummary component gets updated when adding/removing ingredients (with more/less btns) even when the Modal (OrderSummary is inside the Modal) is not showing therefore it is NOT OPTIMIZED
    } */
    // render(props) {
        // console.log('[OrderSummary] ', this.props);
        const ingredientsSummary = Object.keys(props.ingredients)
            .map((igKey) => {
                return (
                    <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}:</span> {props.ingredients[igKey]}</li>
                );
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientsSummary}</ul>
                <p>Total: <strong>{props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={props.purchaseCancelled} cssClass="Danger">CANCEL</Button>
                <Button clicked={props.purchaseContinued} cssClass="Success">CONTINUE</Button>
            </Aux>
        );
    // };
};

export default orderSummary;
// export default OrderSummary;

/* //
// ─── FUNCTIONAL COMPONENT ───────────────────────────────────────────────────────
//

const OrderSummary = (props) => {
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
            <Button clicked={props.purchaseCancelled} cssClass="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued} cssClass="Success">CONTINUE</Button>
        </Aux>
    );
};

export default OrderSummary; */
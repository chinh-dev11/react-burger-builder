import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // old way
    /* constructor(props) {
        super(props);
        this.state = {...};
    } */
    // new way
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        // console.log('[BurgerBuilder] componentDidMount');
        // console.log(this.props);
        axios.get('/ingredients.json')
            .then(response => {
                // console.log('[BurgerBuilder] componentDidMount get response: ', response);
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => { // REM: without catching error, the app will break if error occurred bc data of response (setState above) would be undefined (browser error: Unhandled Rejection (TypeError): Cannot read property 'data' of undefined)
                // console.log('[BurgerBuilder] componentDidMount get error: ', error);
                this.setState({
                    error: true
                });
            });
    };

    updatePurchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => { // go thru the ingredients object by key
                return ingredients[igKey];
            })
            .reduce((sum, el) => { // sum up the ingredient amount (el)
                return sum + el;
            }, 0);
        // console.log(sum);
        this.setState({
            purchasable: sum > 0
        });
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // REM: using ES6 spread operator to create a new copy, bc state should be updated immutably and JS objects are by reference (different pointers to same memory location)
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseHandler(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return; // stop code execution here instead of conditionnal below, OR even better disabled the Less button (see disabledInfo lower) thus this conditional becomes irrelevant
        }
        // const updatedCount = oldCount > 0 ? oldCount - 1 : 0;
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseHandler(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
            loading: false
        });
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render(props) {
        // console.log(this.props);
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        };

        if (this.state.ingredients) {
            // to disabling the Less button if the ingredient is 0
            const disabledInfo = { ...this.state.ingredients }; // REM: create a copy of ingredients
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            );

            if (this.state.loading) {
                orderSummary = <Spinner />;
            };

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

export default withErrorHandler(BurgerBuilder, axios);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // old way
    /* constructor(props) {
        super(props);
        this.state = {...};
    } */
    // new way
    state = {
        purchasing: false,
        loading: false,
        // error: false
    };

    componentDidMount = () => {
        // console.log('[BurgerBuilder] componentDidMount');
        this.props.onInitIngredients();
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => { // go thru the ingredients object by key
                return ingredients[igKey];
            })
            .reduce((sum, el) => { // sum up the ingredient amount (el)
                return sum + el;
            }, 0);
        // console.log(sum);
        return sum > 0;
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
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render(props) {
        // console.log('[BurgerBuilder] render props: ', this.props);
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        };

        if (this.props.ings) {
            // to disabling the Less button if the ingredient is 0
            const disabledInfo = { ...this.props.ings }; // REM: create a copy of ingredients
            // const disabledInfo = { ...this.state.ingredients }; // REM: create a copy of ingredients
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price}
                />
            );

            if (this.state.loading) {
                orderSummary = <Spinner />;
            };

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientType) => {
            dispatch(actions.addIngredient(ingredientType));
        },
        onIngredientRemoved: (ingredientType) => {
            dispatch(actions.removedIngredient(ingredientType));
        },
        onInitIngredients: () => {
            dispatch(actions.initIngredients());
        },
        onInitPurchase: () => {
            dispatch(actions.initPurchase());
        }
    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder, axios);
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
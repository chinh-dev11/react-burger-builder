import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            }) // go thru the ingredients object by key
            .reduce((sum, el) => {
                return sum + el;
            }, 0); // sum up the ingredient amount (el)
        // console.log(sum);
        this.setState({
            purchasable: sum > 0
        });
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //! using ES6 spread operator to create a new copy, bc state should be updated immutably and JS objects are by reference (different pointers to same memory location)
        const updatedIngredients = {...this.state.ingredients};
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
        //! using ES6 spread operator to create a new copy of ingredients, bc state should be updated immutably and JS objects are by reference (different pointers to same memory location)
        const updatedIngredients = {...this.state.ingredients};
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
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        alert('Continue...');
    };

    render() {
        // to disabling the Less button if the ingredient is 0
        const disabledInfo = {...this.state.ingredients}; //! create a copy of ingredients
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // console.log(disabledInfo);
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    />
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchaseCancelHandler} 
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                        />
                </Modal>
                
            </Aux>
        );
    };
};

export default BurgerBuilder;
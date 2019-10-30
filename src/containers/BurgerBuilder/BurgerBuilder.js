import React, { Component, useState, useEffect } from 'react';
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

// REM - import the component in test file (BurgerBuilder.test.js) for shallow rendering will cause the following error, due to the use of 'connect' (Redux store), therefore export explicitly the component as 'export class BurgerBuilder extends Component {...}' to be imported in test file :
/* 
Error: Invariant Violation: Could not find "store" in the context of "Connect(_temp)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(_temp) in connect options.

    > 30 |         wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} onSetAuthRedirectPath={() => {}} />);
         |                   ^
      31 |     });
*/
const burgerBuilder = props => {
// export class BurgerBuilder extends Component {
// class BurgerBuilder extends Component {
    // old way
    /* constructor(props) {
        super(props);
        this.state = {...};
    } */
    // new way
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    /* state = {
        purchasing: false,
        loading: false,
        // error: false
    }; */

    useEffect(() => {
        props.onInitIngredients();
        props.onSetAuthRedirectPath('/');
    }, []);
    /* componentDidMount = () => {
        // console.log('[BurgerBuilder] componentDidMount');
        this.props.onInitIngredients();
        this.props.onSetAuthRedirectPath('/');
    }; */

    const updatePurchaseState = (ingredients) => {
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

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
            /* this.setState({
                purchasing: true
            }); */
        } else {
            // console.log(this.props);
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
        setLoading(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    // render(props) {
        // console.log('[BurgerBuilder] render props: ', this.props);
        let orderSummary = null;
        let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (loading) {
            orderSummary = <Spinner />;
        };

        if (props.ings) {
            // to disabling the Less button if the ingredient is 0
            const disabledInfo = { ...props.ings }; // REM - create a copy of ingredients
            // const disabledInfo = { ...this.state.ingredients }; // REM - create a copy of ingredients
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }

            orderSummary = (
                <OrderSummary
                    ingredients={props.ings}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler}
                    price={props.price}
                />
            );

            if (loading) {
                orderSummary = <Spinner />;
            };

            burger = (
                <Aux>
                    <Burger ingredients={props.ings} />
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={props.price}
                        purchasable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler}
                        isAuth={props.isAuthenticated}
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    // };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
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
        },
        onSetAuthRedirectPath: (path) => {
            dispatch(actions.setAuthRedirectPath(path));
        }
    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder, axios);
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
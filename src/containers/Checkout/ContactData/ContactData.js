import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidityAndError } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                errorType: {
                    empty: 'Can\'t be empty'
                },
                validationError: '',
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                errorType: {
                    empty: 'Can\'t be empty'
                },
                validationError: '',
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                errorType: {
                    empty: 'Can\'t be empty',
                    minLength: 'Minimum length of 5',
                    maxLength: 'Maximum length of 5',
                },
                validationError: '',
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                errorType: {
                    empty: 'Can\'t be empty'
                },
                validationError: '',
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                errorType: {
                    empty: 'Can\'t be empty'
                },
                validationError: '',
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'cheapest', displayName: 'Cheapest' },
                    ]
                },
                value: 'fastest', // by default if not touched/changed
                validation: {}, // FIX: 1) explicitly declare empty object to prevent "TypeError: Cannot read property 'required' of undefined" in checkValidityAndError() when toggle the delivery method select option. This is a preferred method since it keeps the form config uniformly
                valid: true
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        // console.log(event);        
        event.preventDefault(); // REM: to prevent auto request sent, hence page reload, due to form

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price, //* in real-world, the price would be calculated in the backend (server) thus preventing any price manipulation 
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderHandler(order, this.props.token);
    };

    // inputIdentifier: name, street, zipcode, country, email, deliveryMethod
    inputChangedHandler = (evt, inputIdentifier) => {
        // const updatedOrderForm = { ...this.state.orderForm }; // clone (a copy) of orderForm by spreading the object
        // REM: spread operator does not deep (nested objects) clone, but only copies pointer to nested objects, hence the original state could be MUTABLY changed and NOT RECOMMENDED. All nested objects are REQUIRED to be cloned/copied before IMMUTABLY changing its state
        /* const updatedOrderElement = { ...updatedOrderForm[inputIdentifier] }; // clone (a copy) an element of orderForm by spreading the object
        updatedOrderElement.value = evt.target.value;
        updatedOrderElement.valid = this.checkValidityAndError(evt.target.value, this.state.orderForm[inputIdentifier], updatedOrderElement);
        updatedOrderElement.touched = true; */
        // using updateObject utility to replace the above lines
        const updatedOrderElement = updateObject(
            this.state.orderForm[inputIdentifier],
            {
                value: evt.target.value,
                ...checkValidityAndError(evt.target.value, this.state.orderForm[inputIdentifier]),
                touched: true
            }
        );

        // updatedOrderForm[inputIdentifier] = updatedOrderElement;
        const updatedOrderForm = updateObject(
            this.state.orderForm,
            {
                [inputIdentifier]: updatedOrderElement
            }
        );

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        // console.log(formIsValid);
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    };

    render(props) {
        // console.log('[ContactData] ', this.props);
        // console.log(this.state.orderForm);
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        // console.log(formElementsArray);
        const inputElements = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                validationError={formElement.config.validationError}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let form = this.props.error ? <p>Something went wrong!</p> : <Spinner />;
        if (!this.props.loading) {
            form = (
                <form onSubmit={this.orderHandler}>
                    {inputElements}
                    <Button cssClass="Success" btnType="submit" disabled={!this.state.formIsValid}>Order</Button>
                    {/* <Button cssClass="Success" clicked={this.orderHandler}>Order</Button> */}
                </form>
            );
        } else {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (orderData, token) => {
            dispatch(actions.purchaseBurger(orderData, token))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
// export default withRouter(ContactData); // to make parent's (Checkout) routing props (history, location, match) avail to child (ContactData) component
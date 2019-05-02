import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'cheapest', displayName: 'Cheapest' },
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault(); // prevent sending request auto due to form

        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice, //* in real-world, the price would be calculated in the backend (server) thus preventing any price manipulation 
        };

        // extension .json is required for Firebase
        axios.post('/orders.json', order)
            .then((response) => {
                // console.log('[ContactData] post response: ', response);
                this.setState({
                    loading: false
                });
                this.props.history.push('/'); // to root home page after placing order succeed
            })
            .catch((error) => {
                // console.log('[ContactData] post error: ', error);
                this.setState({
                    loading: false
                });
            });
    };

    // inputIdentifier: name, street, zipcode, country, email, deliveryMethod
    inputChangedHandler = (evt, inputIdentifier) => {
        // console.log(inputIdentifier);
        // console.log(evt.target.value);
        const updatedOrderForm = {...this.state.orderForm}; // clone (a copy) of orderForm by spreading the object
        // console.log(updatedOrderForm);
        // REM: spread operator does not deep (nested objects) clone, but only copies pointer to nested objects, hence the original state could be MUTABLY changed and NOT RECOMMENDED. All nested objects are REQUIRED to be cloned/copied before IMMUTABLY changing its state
        const updatedOrderElement = {...updatedOrderForm[inputIdentifier]}; // clone (a copy) an element of orderForm by spreading the object
        // console.log(updatedOrderElement);
        updatedOrderElement.value = evt.target.value;
        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        this.setState({
            orderForm: updatedOrderForm
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
        const inputElements = formElementsArray.map(el => (
            <Input key={el.id} config={el.config} changed={(event) => this.inputChangedHandler(event, el.id)} /> // with value attribute
            // <Input key={el.id} config={el.config} changed={this.inputChangedHandler} /> // with defaultValue attribute
        ));

        let form = <Spinner />;
        if (!this.state.loading) {
            form = (
                <form>
                    {inputElements}
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
// export default withRouter(ContactData); // to make parent's (Checkout) routing props (history, location, match) avail to child (ContactData) component
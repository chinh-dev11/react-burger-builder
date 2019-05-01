import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            customer: {
                name: 'Max',
                address: {
                    street: 'Teststreet 1',
                    zipcode: '123456',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest' // [cheapest, ...]
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

    render(props) {
        // console.log('[ContactData] ', this.props);
        let form = <Spinner />;
        if (!this.state.loading) {
            form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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
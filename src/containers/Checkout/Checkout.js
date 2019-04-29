import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 1,
            cheese: 1,
        }
    };

    componentDidMount() {
        console.log('[Checkout] componentDidMount');
        console.log(this.props);
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
        /* this.setState({
            loading: true
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, //* in real-world, the price would be calculated in the backend (server) thus preventing any price manipulation 
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
                // console.log('[BurgerBuilder] post response: ', response);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch((error) => {
                // console.log('[BurgerBuilder] post error: ', error);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            }); */
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;
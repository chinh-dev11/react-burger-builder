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

    checkoutCancelledHandler = () => {
        this.props.history.goBack(); // back to previous page
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data'); // relative path to next page
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler} // back
                    checkoutContinued={this.checkoutContinuedHandler} // next page
                    />
            </div>
        );
    }
}

export default Checkout;
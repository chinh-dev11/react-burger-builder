import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {}
    };

    componentDidMount() {
        // console.log(this.props.location.search);
        let ingredients = {};
        const queryString = new URLSearchParams(this.props.location.search);

        for (let param of queryString.entries()) {
            // console.log(param); // ["bacon", "1"]
            ingredients[param[0]] = +param[1];
        }
        // console.log(ingredients);
        this.setState({
            ingredients: ingredients
        });
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack(); // back to previous page
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data'); // relative path to next page
    };

    render(props) {
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
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {
    // console.log('props: ', props);
    // class Checkout extends Component {
    /* state = {
        ingredients: null,
        totalPrice: 0
    }; */

    //! TypeError: Cannot convert undefined or null to object
    /* burger
        src/components/Burger/Burger.js:21
        18 |     return [...Array(props.ingredients[igKey])]
        19 |  * }: [Array(1), Array(1), Array(2), Array(1)]
        20 |  
        > 21 | let transformedIngredients = Object.keys(props.ingredients)
            | ^  22 |     .map((igKey) => {
        23 |         // console.log('igKey: ', igKey);
        24 |         // console.log('Array(props.ingredients[igKey]): ', Array(props.ingredients[igKey])); */
    // componentDidMount() { // REM - because componentDidMount lifecycle gets executed after all child components been rendered and mount, therefore using componentWillMount lifecycle to ensure 'this.state.ingredients' object been generated with data, thus preventing TypeError (above) of child processing on a null/undefined object
    /* componentWillMount() {
        // console.log('[Checkout] componentWillMount');
        // console.log(this.props.location.search);
        let ingredients = {};
        let price = 0;
        const queryString = new URLSearchParams(this.props.location.search);

        for (let param of queryString.entries()) {
            // console.log(param); // ["bacon", "1"]
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        // console.log(ingredients);
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }; */

    const checkoutCancelledHandler = () => {
        // checkoutCancelledHandler = () => {
        props.history.goBack(); // back to previous page
        // this.props.history.goBack(); // back to previous page
    };

    const checkoutContinuedHandler = () => {
        // checkoutContinuedHandler = () => {
        props.history.replace(props.match.url + '/contact-data'); // relative path to next page
        // this.props.history.replace(this.props.match.url + '/contact-data'); // relative path to next page
    };

    // render(props) {
    // console.log('[Checkout] ', this.props);
    let summary = <Redirect to="/" />;
    if (props.ings) {
        // if (this.props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        // const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    // ingredients={this.props.ings}
                    checkoutCancelled={checkoutCancelledHandler} // back
                    // checkoutCancelled={this.checkoutCancelledHandler} // back
                    checkoutContinued={checkoutContinuedHandler} // next page
                // checkoutContinued={this.checkoutContinuedHandler} // next page
                />
                {/** // REM - required forwarding the props to component when render manually, thus providing 'match, history, location,...' props to the loading component
                            Error: TypeError: Cannot read property 'path' of undefined
                            the error above is caused by the change of lazy loading made in App.js
                            FIX - <Route path="/checkout" render={(props) => <lazyLoad.Checkout {...props} />}
                    */}
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
                {/* render manually to pass props to component */}
                {/* <Route
                        path={this.props.match.path + '/contact-data'}
                        
                        // REM - render manually prevents having routing props (history, location, match) avail to ContactData component
                        // FIX -
                        // 1) passing the props as argument to render()
                        //     render={(props) => (
                        //         <ContactData
                        //             ingredients={this.state.ingredients}
                        //             totalPrice={this.state.totalPrice}
                        //             {...props}
                        //         />
                        //     )}
                        // 2) OR wrapping child component (ContactData) with 'withRouter' to make routing props avail
                            // export default withRouter(ContactData);// to make parent's (Checkout) routing props (history, location, match) avail to child (ContactData) component
                        
                        // render={(props) => (
                        //     <ContactData
                        //         ingredients={this.state.ingredients}
                        //         totalPrice={this.state.totalPrice}
                        //         {...props}
                        //     />
                        // )}
                    /> */}
            </div>
        );
    }

    return summary;
    // }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(checkout);
// export default connect(mapStateToProps)(Checkout);
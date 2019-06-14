import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const orders = props => {
// class Orders extends Component {
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, []);
    /* componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    } */

    // render(props) {
        // 
        let ordersList = <Spinner />;
        if (!props.loading) {
            if (props.error) {
                ordersList = <p>Something went wrong!!!</p>
            } else {
                if (props.orders.length > 0) {
                    ordersList = props.orders.map(order => {
                        return (
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}
                            />
                        );
                    });
                } else {
                    ordersList = <p>Orders list empty!!!</p>
                }
            }
        }
        /* if (!this.props.loading) {
            if (this.props.error) {
                ordersList = <p>Something went wrong!!!</p>
            } else {
                if (this.props.orders.length > 0) {
                    ordersList = this.props.orders.map(order => {
                        return (
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}
                            />
                        );
                    });
                } else {
                    ordersList = <p>Orders list empty!!!</p>
                }
            }
        } */

        return (
            <div>
                {ordersList}
            </div>
        );
    // }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
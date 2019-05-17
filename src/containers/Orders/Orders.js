import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }
    render(props) {
        // console.log('[Orders] props: ', this.props);
        let ordersList = <Spinner />;
        if (!this.props.loading) {
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
        }

        return (
            <div>
                {ordersList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">{props.userId ? props.userId : 'Authentication'}</NavigationItem>
    </ul>
);

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(navigationItems);
import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    // console.log('props: ', props);
    const navItem = {
        orders: props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null,
        authentication: props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Authentication</NavigationItem>
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {navItem.orders}
            {navItem.authentication}
        </ul>
    );
};

export default navigationItems;
import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    // console.log('props: ', props);
    const navItem = {
        link: props.isAuthenticated ? '/logout' : '/auth',
        label: props.isAuthenticated ? 'Logout' : 'Authentication'
    };

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link={navItem.link}>{navItem.label}</NavigationItem>
        </ul>
    );
};

export default navigationItems;
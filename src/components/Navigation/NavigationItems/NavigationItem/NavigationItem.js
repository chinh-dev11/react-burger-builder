import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* 
        REM: NavLink manages itself for the 'active' css class, but does not work properly with scoped css (module.css), which generates hash active 'NavigationItem_active__3P3sf' and not 'active' as class name. It requires to set the class with 'activeClassName' NavLink property as: activeClassName={classes.active} */}
        {/* 
        REM: both links will have active class since the BurgerBuilder link  is '/' which is treated as prefix
        FIX: 
            1) add 'exact' to the link:
                <NavLink
                    to={props.link}
                    exact
                    activeClassName={classes.active}
                >{props.children}</NavLink>
            2) OR pass it as props to prevent having 'exact' to all links, if not required:
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>

                <NavLink
                    to={props.link}
                    exact={props.exact}
                    activeClassName={classes.active}
                >{props.children}</NavLink>
        */}
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
        >{props.children}</NavLink>
    </li>
);

export default navigationItem;
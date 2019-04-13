import React from 'react';
import Aux from '../../hoc/Aux'; // custom component should be imported as Aux (capitalized)
import classes from './Layout.module.css';

const layout = props => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
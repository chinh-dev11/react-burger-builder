import React from 'react';
import Aux from '../../hoc/Aux'; // custom component should be imported as Aux (capitalized)
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props => (
    <Aux>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
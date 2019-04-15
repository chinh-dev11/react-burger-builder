import React, { Component } from 'react';
import Aux from '../../hoc/Aux'; // custom component should be imported as Aux (capitalized)
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    sideDrawerToggleHandler = () => {
        /* this.setState({
            showSideDrawer: !this.state.showSideDrawer //! getting the state (this.state.showSideDrawer) in setState might not return the previous state due to the async nature of setState, therefore it's recommended to use the function form to get the previous state instead, as below...
        }); */
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    };

    render(props) {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

export default Layout;

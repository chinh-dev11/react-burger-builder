import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux'; // custom component should be imported as Aux (capitalized)
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
// class Layout extends Component {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    /* state = {
        showSideDrawer: false
    }; */

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };
    /* sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }; */

    const sideDrawerToggleHandler = () => {
        // this.setState({
            // showSideDrawer: !this.state.showSideDrawer // REM - getting the state (this.state.showSideDrawer) in setState might not return the previous state due to async nature of setState, therefore it's recommended to use the function form to get the previous state instead, as below...
        // });
        setSideDrawerIsVisible(!sideDrawerIsVisible);
        /* this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        }); */
    };
    /* sideDrawerToggleHandler = () => {
        // this.setState({
            // showSideDrawer: !this.state.showSideDrawer // REM - getting the state (this.state.showSideDrawer) in setState might not return the previous state due to async nature of setState, therefore it's recommended to use the function form to get the previous state instead, as below...
        // });
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    }; */

    // render(props) {
        return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    // isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler}
                    // drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    // isAuth={this.props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    // open={this.state.showSideDrawer}
                    closed={sideDrawerClosedHandler}
                    // closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>
                    {props.children}
                    {/* {this.props.children} */}
                </main>
            </Aux>
        );
    // };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);
// export default connect(mapStateToProps)(Layout);

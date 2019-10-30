import React, { Component, useEffect, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';
// import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

/* const Async = {
  Auth: asyncComponent(() => {
    return import('./containers/Auth/Auth');
  }),
  Orders: asyncComponent(() => {
    return import('./containers/Orders/Orders');
  }),
  Checkout: asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
  }),
  Logout: asyncComponent(() => {
    return import('./containers/Auth/Logout/Logout');
  })
}; */

const lazyLoad = {
  Auth: lazy(() => import('./containers/Auth/Auth')),
  Orders: lazy(() => import('./containers/Orders/Orders')),
  Checkout: lazy(() => import('./containers/Checkout/Checkout')),
  Logout: lazy(() => import('./containers/Auth/Logout/Logout'))
};

const app = (props) => {  
  // console.log('[app] props: ', props);
// class App extends Component {
  // test purposes: removing interceptors registered in withErrorHandler
  /* state = {show: true};
  componentDidMount() {
    setTimeout(() => {
      this.setState({show:false});
    }, 3000);
  } */

  useEffect(() => {
    props.onTryAutoSignup();
  }, []);  // REM - pass en empty array to execute the callback (1st argument) only once (as componentDidMount() in class-based) thus prevent infinite loop, since useEffect() has nothing compare with for re-execute the callback (1st argument) - as with componentDidMount() in class-based
  // }, [someArgument]); // REM - for example: passing 'someArgument' as 2nd argument, the callback (1st argument) will be executed/activated at every change of 2nd argument - as with componentDidMount() + componentDidUpdate() with an if check included in it
  // }; // REM - no 2nd argument: will run for every render cycle  
  /* componentWillMount() {
    this.props.onTryAutoSignup();
  } */

  // render(props) {
    // console.log('[App] props: ', this.props);
    let routes = (
      <Switch>
        <Route path="/auth" render={props => <lazyLoad.Auth {...props} />} />
        {/* <Route path="/auth" component={Async.Auth} /> */}
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    // console.log('props.isAuthenticated: ', props.isAuthenticated);
    if (props.isAuthenticated) {
    // console.log('this.props.isAuthenticated: ', this.props.isAuthenticated);
    // if (this.props.isAuthenticated) {
      routes =
        (<Switch>
          <Route path="/orders" render={props => <lazyLoad.Orders {...props} />} />
          <Route path="/checkout" render={props => <lazyLoad.Checkout {...props} />} />
          <Route path="/logout" render={props => <lazyLoad.Logout {...props} />} />
          <Route path="/auth" render={props => <lazyLoad.Auth {...props} />} />
          {/* <Route path="/orders" component={Async.Orders} />
          <Route path="/checkout" component={Async.Checkout} />
          <Route path="/logout" component={Async.Logout} />
          <Route path="/auth" component={Async.Auth} /> */}
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
        );
    }
    return (
      <div>
        <Layout>
          {/* test purposes: removing interceptors registered in withErrorHandler */}
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          <Suspense fallback={<Spinner />}>{routes}</Suspense>
          {/* {routes} */}
        </Layout>
      </div>
    );
  // }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(app);
// export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App));

console.log('***** ', process.env);
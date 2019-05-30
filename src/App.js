import React, { Component } from 'react';
// import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
// import Spinner from './components/UI/Spinner/Spinner';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
// import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

const Async = {
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
};

/* const lazyLoading = {
  Auth: React.lazy(() => import('./containers/Auth/Auth')),
  Orders: React.lazy(() => import('./containers/Orders/Orders')),
  Checkout: React.lazy(() => import('./containers/Checkout/Checkout')),
  Logout: React.lazy(() => import('./containers/Auth/Logout/Logout'))
}; */

class App extends Component {
  // test purposes: removing interceptors registered in withErrorHandler
  /* state = {show: true};
  componentDidMount() {
    setTimeout(() => {
      this.setState({show:false});
    }, 3000);
  } */
  componentWillMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        {/* <Route path="/auth" render={() => <Suspense fallback={<Spinner />}><lazyLoading.Auth /></Suspense>} /> */}
        <Route path="/auth" component={Async.Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes =
        (<Switch>
          {/* <Route path="/orders" render={() => <Suspense fallback={<Spinner />}><lazyLoading.Orders /></Suspense>} />
          <Route path="/checkout" render={() => <Suspense fallback={<Spinner />}><lazyLoading.Checkout /></Suspense>} />
          <Route path="/logout" render={() => <Suspense fallback={<Spinner />}><lazyLoading.Logout /></Suspense>} />
          <Route path="/auth" render={() => <Suspense fallback={<Spinner />}><lazyLoading.Auth /></Suspense>} /> */}
          <Route path="/orders" component={Async.Orders} />
          <Route path="/checkout" component={Async.Checkout} />
          <Route path="/logout" component={Async.Logout} />
          <Route path="/auth" component={Async.Auth} />
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
          {routes}
        </Layout>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App));

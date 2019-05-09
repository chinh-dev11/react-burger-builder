import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  // test purposes: removing interceptors registered in withErrorHandler
  /* state = {show: true};
  componentDidMount() {
    setTimeout(() => {
      this.setState({show:false});
    }, 3000);
  } */
  render() {
    return (
      <div>
        <Layout>
          {/* test purposes: removing interceptors registered in withErrorHandler */}
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

// Boostrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Middleware
const logger = store => {
    return next => {
        return action => {
            // console.log('[Middleware] Dispatching', action);
            const result = next(action);
            // console.log('[Middleware] next state', store.getState());
            return result;
        };
    };
};

// combine reducers
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

// Advanced store setup
// REM: because of how the project was setup, we can use the environment variables (process.env.NODE_ENV) to use Redux DevTool, which exposes the app Redux store, when in development environment only
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(
    rootReducer,
    /* preloadedState, */
    composeEnhancers(
        applyMiddleware(logger, thunk) // can pass multiple middleware, which will be executed synchronously one after the other
    )
);

// Basic store
/* const store = createStore(
    burgerBuilderReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); */

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

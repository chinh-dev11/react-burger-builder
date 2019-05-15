// Boostrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

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

// const store = createStore(reducer, applyMiddleware(logger)); // can pass multiple middleware, which will be executed synchronously one after the other

// Basic store
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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

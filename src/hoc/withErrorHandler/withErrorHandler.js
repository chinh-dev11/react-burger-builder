import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    // REM: this is HOC hence theorically it is intended to be used on components that required error handling. If it's used by multiple components, then there will be multiple instances of the interface (class below), hence multiple interceptors will be created too, which would lead to dead/unused interceptors sitting in memory, which still react to requests, worst case they lead to errors, or somehow change the state of the app, and even in best case they leak memory. Therefore using componentWillUnmount lifecycle hook to eject (clean/remove) interceptors that are no longer needed.
    return class extends Component { // REM: used without class name as an interface
        state = {
            error: null
        };

        // REM: as specified by Lifecycle Hooks, since componentDidMount on the parent (withErrorHandler - wrapper) is called only after the child (BurderBuilder - WrappedComponent) componentDidMount is called, thus the interceptors are not being registered yet and won't intercept any requests, therefore the withErrorHandler interceptors need to be registered in componentWillMount instead, and it's ok since we are not causing any side effects but just registering interceptors
        // REM: in BurgerBuilder case, the get request (axios.get('/ingredients.json')...) is sent inside BurgerBuilder (child) componentDidMount hook, before the withErrorHandler interceptors being registered, therefore request/response won't get intercepted
        // REM: componentDidMount might not be supported in the future, and the idea of componentDidMount is to get code executed when the component is created, therefore using constructor will work the same way
        /* componentDidMount() {
            console.log('[withErrorHandler] componentDidMount');
            axios.interceptors.request.use(req => {
                console.log('[withErrorHandler] componentDidMount interceptors.request: ', req);
                // this.setState({error: null});
                return req;
            });

            axios.interceptors.response.use(res => res, error => {
                console.log('[withErrorHandler] componentDidMount interceptors.response: ', error);
                // this.setState({error: error});
            });
        } */
        componentWillMount() {
            // console.log('[withErrorHandler] componentWillMount');
            // console.log(this.props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // console.log('[withErrorHandler] componentWillMount interceptors.request: ', req);
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                // console.log('[withErrorHandler] componentWillMount interceptors.response: ', error);
                this.setState({error: error});
            });
        }

        // eject (clean/remove) interceptors that are no longer needed
        componentWillUnmount() {
            // console.log('[withErrorHandler] componentWillUnmount', this.reqInterceptor, this.resInterceptor); // [withErrorHandler] componentWillUnmount 0 0
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = ()=> {
            this.setState({error: null});
        }; 

        render(props) {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                        >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>

            );
        }

    };
};

export default withErrorHandler; 
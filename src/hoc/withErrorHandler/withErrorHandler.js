import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component { //REM: used without class name as an interface
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
            console.log('[withErrorHandler] componentWillMount');
            axios.interceptors.request.use(req => {
                console.log('[withErrorHandler] componentWillMount interceptors.request: ', req);
                this.setState({error: null});
                return req;
            });

            axios.interceptors.response.use(res => res, error => {
                console.log('[withErrorHandler] componentWillMount interceptors.response: ', error);
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = ()=> {
            this.setState({error: null});
        }; 

        render(props) {
            console.log(props);
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                        >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>

            );
        }

    };
};

export default withErrorHandler; 
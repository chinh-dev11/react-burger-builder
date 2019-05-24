import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const errorMessage = {
    required: 'Can\'t be empty',
    email: 'Format: xxx@xxx.xxx',
    minLength: 'Length of 6 characters minimum'
};

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6 // length required by Firebase
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        // REM: email validation pattern
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (evt, id) => {
        // REM: set state immutably - nested objects
        const updatedControls = {
            ...this.state.controls,
            [id]: {
                ...this.state.controls[id],
                value: evt.target.value,
                valid: this.checkValidity(evt.target.value, this.state.controls[id].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    };

    onSubmitHandler = (evt) => {
        // console.log('onSubmitHandler... evt: ', evt);
        evt.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                ...this.state,
                isSignUp: !prevState.isSignUp
            };
        });
    };

    localStoreToken() {
        // console.log(window);
        window.localStorage.setItem('bbIdToken', this.props.token);
    }

    render(props) {
        // console.log('props: ', this.props);
        if (this.props.token) {
            this.localStoreToken();
        }

        let formError = null;
        if (this.props.error) {
            formError = <span className={classes.Error}>{this.props.error.message}</span>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        
        let authForm = <Spinner />;
        if (!this.props.loading) {
            // REM: transforming object to array of objects 
            const formElementsArray = [];
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
            const inputElements = formElementsArray.map(formElement => {
                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                );
            });
            authForm = (
                <form onSubmit={this.onSubmitHandler}>
                    {inputElements}
                    <Button cssClass="Success" btnType="submit">SUBMIT</Button>
                </form>

            );
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {formError}
                {authForm}
                <Button
                    cssClass="Danger"
                    btnType="button"
                    clicked={this.switchAuthModeHandler}
                >Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
        loading: state.auth.loading,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
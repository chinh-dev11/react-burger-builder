import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

/* const errorMessage = {
    required: 'Can\'t be empty',
    email: 'Format: xxx@xxx.xxx',
    minLength: 'Length of 6 characters minimum'
}; */

const Auth = props => {
// class Auth extends Component {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'test@example.com'
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
                placeholder: 'Passw0rd!'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6 // length required by Firebase
            },
            valid: false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);

    const inputChangedHandler = (evt, id) => {
        // REM - set state immutably - nested objects
        /* const updatedControls = {
            ...this.state.controls,
            [id]: {
                ...this.state.controls[id],
                value: evt.target.value,
                valid: this.checkValidity(evt.target.value, this.state.controls[id].validation),
                touched: true
            }
        }; */
        // using updateObject utility
        const updatedControls = updateObject(
            controls,
            {
                [id]: updateObject(
                    controls[id],
                    {
                        value: evt.target.value,
                        valid: checkValidity(evt.target.value, controls[id].validation),
                        touched: true
                    }
                )
            }
        );

        setControls(updatedControls);
    };

    const onSubmitHandler = (evt) => {
        // console.log('onSubmitHandler... evt: ', evt);
        evt.preventDefault();

        props.onAuth(controls.email.value || 'test@example.com', controls.password.value || 'Passw0rd!', isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp)
    };

    // render(props) {
        // console.log('props: ', this.props);
        let formError = null;
        if (props.error) {
            formError = <span className={classes.Error}>{props.error.message}</span>
        }

        let authRedirect = null;
        if (props.isAuthenticated) {
            authRedirect = <Redirect to={props.authRedirectPath} />;
        }

        let authForm = <Spinner />;
        if (!props.loading) {
            // REM - transforming object to array of objects 
            const formElementsArray = [];
            for (let key in controls) {
                formElementsArray.push({
                    id: key,
                    config: controls[key]
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
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                    />
                );
            });
            authForm = (
                <form onSubmit={onSubmitHandler}>
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
                    clicked={switchAuthModeHandler}
                >Switch to {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    // }
};

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
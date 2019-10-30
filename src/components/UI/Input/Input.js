import React from 'react';

import classes from './Input.module.css';

const input = props => {
    // console.log('[Input] ', props);
    let inputElement = null;
    let inputClasses = [classes.Input];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <span className={classes.Error}>{props.validationError}</span>;
    }

    switch (props.elementType) {
        case 'select':
            const options = props.elementConfig.options.map(option => (
                <option
                    key={option.value}
                    value={option.value}>
                    {option.displayName}
                </option>
            ));
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    // value={props.config.value} 
                    // defaultValue={props.config.value} 
                    onChange={props.changed}>
                    {options}
                </select>
            );
            break;
        case 'text':
            inputElement =
                <textArea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} 
                    onChange={props.changed}
                />
            break;
        default: // 'input'
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} // REM - with value attribute, it requires handling manually, via onChange() event, to set (setState|useSate)) the input value thus have it display on input box in browser
                    // defaultValue={props.config.value} // REM - with defaultValue attribute, it allows having value/text entered displaying on input box in browser, no need handling manually the input value displaying
                    onChange={props.changed}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;
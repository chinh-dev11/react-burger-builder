import React from 'react';

import classes from './Input.module.css';

const input = props => {
    // console.log('[Input] ', props.config);
    let inputElement = null;

    switch (props.config.elementType) {
        case 'select':
            const options = props.config.elementConfig.options.map(option => (
                <option
                    key={option.value}
                    value={option.value}>
                    {option.displayName}
                </option>
            ));
            inputElement = (
                <select
                    className={classes.Select}
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
                    className={classes.InputElement}
                    {...props.config.elementConfig}
                    value={props.config.value} 
                    onChange={props.changed}
                />
            break;
        default: // 'input'
            inputElement = (
                <input
                    className={classes.InputElement}
                    {...props.config.elementConfig}
                    value={props.config.value} // REM: with value attribute, it requires handling manually, via onChange() event, to set (setState|useSate)) the input value thus have it display on input box in browser
                    // defaultValue={props.config.value} // REM: with defaultValue attribute, it allows having value/text entered displaying on input box in browser, no need handling manually the input value
                    onChange={props.changed}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
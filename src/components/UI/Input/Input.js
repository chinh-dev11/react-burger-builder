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
                    value={props.config.value}>
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
                />
            break;
        default: // 'input'
            inputElement = (
                <input
                    className={classes.InputElement}
                    {...props.config.elementConfig}
                    defaultValue={props.config.value}
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
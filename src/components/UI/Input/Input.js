import React from 'react';

import classes from './Input.module.css';

const input = props => {
    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={classes.InputElement} {...props.elememtConfig} value={props.value} />
            break;
        case 'text':
            inputElement = <textArea className={classes.InputElement} {...props.elememtConfig} value={props.value} />
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elememtConfig} value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <button
        type={props.btnType ? props.btnType : "button"}
        className={[classes.Button, classes[props.cssClass]].join(' ')}
        onClick={props.clicked}>{props.children}
    </button>
);

export default button;
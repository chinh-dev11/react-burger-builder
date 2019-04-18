import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

//
// ─── CLASS-BASED COMPONENT ───────────────────────────────────────────────────────
//

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) { //* performance improvement purposes
        // console.log('[Modal] shouldComponentUpdate: ', nextProps.show);
        // return nextProps.show; // re-rendering only when show is true will not dismiss (hide) the modal since render() needs to run to get the style transform updated (show/hide). Thus the validation needs to be on props.show changes and not when it's true only
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) { // also validating if spinner or summary should be displayed
            return true;
        }

        return false;
        // return true
    }

    render(props) {
        return (
            <Aux>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    >
                    {this.props.children}
                </div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            </Aux>
        ); 
    }
} 

export default Modal;

/* 
//
// ─── FUNCTIONAL COMPONENT ───────────────────────────────────────────────────────
//

const modal = (props) => (
    <Aux>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            >
            {props.children}
        </div>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
    </Aux>
);

export default modal; */
import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

//
// ─── CLASS-BASED COMPONENT ───────────────────────────────────────────────────────
//

const modal = props => {
    // console.log('[Modal] props: ', props);
// class Modal extends Component {
    // REM - nextProps/nextState: parameters that can be used to validate when changes occurred  
    // REM - use memo() in functional component to improve performance: export default React.memo(modal);
    /* shouldComponentUpdate(nextProps, nextState) { //* performance improvement purposes
        console.log('nextProps: ', nextProps);
        // console.log('[Modal] shouldComponentUpdate: ', nextProps.show);
        // return nextProps.show; // re-rendering only when show is true will not dismiss (hide) the modal since render() needs to run to get the style transform updated (show/hide). Thus the validation needs to be on props.show changes and not when it's true only
        console.log('nextProps.show !== this.props.show: ', nextProps.show !== this.props.show);
        console.log('nextProps.children !== this.props.children: ', nextProps.children !== this.props.children);
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) { // also validating if spinner or summary should be displayed
            return true;
        }

        return false;
        // return true
    } */

    // render(props) {
        // console.log('props: ', this.props);
        return (
            <Aux>
                <div
                    className={classes.Modal}
                    style={{
                        // transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        // opacity: this.props.show ? '1' : '0'
                        opacity: props.show ? '1' : '0'
                    }}
                >
                    {/* {this.props.children} */}
                    {props.children}
                </div>
                {/* <Backdrop show={this.props.show} clicked={this.props.modalClosed} /> */}
                <Backdrop show={props.show} clicked={props.modalClosed} />
            </Aux>
        );
    // }
};

export default React.memo( // REM - memo(): allows to optimize performance by caching (keep in memory) the component's latest rendering. By default it will re-render the component when props change, otherwise it will use the cache. As with PureComponent or shouldComponentUpdate() in class-based components
    modal,
    // (prevProps, nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children // REM - use 2nd argument to specify when it should not re-render but use the cache instead OR
    (prevProps, nextProps) => {
        // console.log('prevProps: ', prevProps);
        // console.log('nextProps: ', nextProps);
        return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
    }
);
// export default Modal;

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
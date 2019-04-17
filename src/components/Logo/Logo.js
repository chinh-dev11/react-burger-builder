import React from 'react';
import classes from './Logo.module.css'

/**
 * The image path cannot be declared in img src property since the path would be diffrent when webpack packages the app
 * Importing the image tells webpack to handle the image, with a spcial plugin/module that was added to webpack's config, by copying the image to the destination which it's created, and even optimized the image in the process
 */
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        {/* the path will be dynamically resolved to the location created by webpack when packaging the app */}
        <img src={burgerLogo} alt="Myburger" />
    </div>
);

export default logo;
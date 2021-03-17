import React from 'react';
import classes from './ErrorView.module.css';

const ErrorView = () => {
    return (
        <div className={ classes.error_wrap }>
            <span className={ classes.error_text }>Something went wrong!</span>
        </div>
    )
};

export default ErrorView
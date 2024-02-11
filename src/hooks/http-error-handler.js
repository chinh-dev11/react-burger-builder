// REM - Customizing http error handling hook by outsourcing the error handling from withErrorHandler,js

import { useState, useEffect } from 'react';

// export default httpClient => {
const HttpClientHandler = httpClient => {
    const [error, setError] = useState(null);

    // REM - to have the following code runs before component rendered, as with componentWillMount(), it just needs to be declared before JSX code (before return(...) below)
    // REM - cannot use useEffect() here since useEffect() always runs after component rendered (the render cycle - return(...JSX...))
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        // console.log('[withErrorHandler] componentWillMount interceptors.request: ', req);
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(
        res => {
            // console.log('[withErrorHandler] componentWillMount interceptors.response: ', res);
            return res;
        },
        err => {
            // console.log('[withErrorHandler] componentWillMount interceptors.response.error: ', err);
            setError(err);
        });

    // REM - useEffect() as with componentWillMount() hook in class-based
    useEffect(() => {
        // console.log('useEffect() cleanup...');
        // console.log(reqInterceptor, ' ', resInterceptor);
        return () => { // REM - cleanup
            // console.log('cleaning up...');
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.request.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]); // REM - useEffect() will be execute, hence doing cleanup in this case, when there are changes in arguments (reqInterceptor/resInterceptor)

    const errorConfirmedHandler = () => {
        setError(null);
    };

    // returning something is optional. We can return anything or none and handling the error here (eg: showing error in a modal), as in withErrorHandler.js
    return [error, errorConfirmedHandler];
};

export default HttpClientHandler
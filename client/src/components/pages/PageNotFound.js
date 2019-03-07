import React, { Component } from 'react';
import GoHome from '../ui/GoHome';

class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="">404</h1>
                <h2>Page not found</h2>
                <p className="">
                    If you believe this occured in error, please contact support at{' '}
                    <a href="mailto:doghousedevelop@gmail.com" target="_blank" rel="noopener noreferrer">
                        doghousedevelop@gmail.com.
                    </a>
                </p>
                <h3 className="">Thanks</h3>
                <GoHome buttonOrLink="button" size="large" />
            </div>
        );
    }
}

export default PageNotFound;

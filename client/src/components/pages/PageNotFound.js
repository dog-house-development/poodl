import React, { Component } from 'react';
import GoHome from '../ui/GoHome';

class PageNotFound extends Component {
    render() {
        return (
            <div className="landing-container">
                <div className="landing-header">
                    <h1 className="landing-title">404</h1>
                    <h1>Page not found</h1>
                    <p>
                        If you believe this occured in error, please contact support at{' '}
                        <a href="mailto:doghousedevelop@gmail.com" target="_blank" rel="noopener noreferrer">
                            doghousedevelop@gmail.com.
                        </a>
                    </p>
                    <h3>Thanks</h3>
                    <GoHome buttonOrLink="button" size="large" />
                </div>
            </div>
        );
    }
}

export default PageNotFound;

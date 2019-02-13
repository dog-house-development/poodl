import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
    render() {
        return (
            <div className="landing-container">
                <div className="landing-header">
                    <h1 className="landing-title">404</h1>
                    <h1>Page not found</h1>
                    <p>
                        If you believe this occured in error, please contact support at{' '}
                        <a href="mailto:doghousedevelop@gmail.com" target="_blank" rel="noopener">
                            doghousedevelop@gmail.com.
                        </a>
                    </p>
                    <h3>Thanks</h3>
                    <Link to="/dashboard" className="button large primary">
                        Home
                    </Link>
                </div>
            </div>
        );
    }
}

export default PageNotFound;

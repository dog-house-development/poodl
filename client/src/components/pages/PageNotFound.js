import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <div className="landing-header">
                    <h1 className="landing-title">404</h1>
                    <h1>Page not found</h1>
                    <p>If you believe this occured in error, please contance support.</p>
                    <h3>Thanks</h3>
                    <Link to="/" className="button large primary">
                        Home
                    </Link>
                </div>
            </div>
        );
    }
}

export default Landing;

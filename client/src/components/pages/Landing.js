import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <div className="landing-header">
                    <h1>Welcome to</h1>
                    <h1 className="landing-title">Poodl</h1>
                    <p>The member management tool for rural senior centers!</p>
                    <Link to="/" className="button large primary">
                        Learn more
                    </Link>
                </div>
            </div>
        );
    }
}

export default Landing;

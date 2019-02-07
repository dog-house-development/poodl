import React, { Component } from 'react';

class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <h4>Welcome to Poodl!</h4>
                <p>The member management tool for rural senior centers!</p>
                <p>
                    Users please see our{' '}
                    <a href="https://github.com/dog-house-development/poodl/wiki/User-Documentation">
                        User Documentation.
                    </a>
                </p>
                <p>
                    Developers please see our{' '}
                    <a href="https://github.com/dog-house-development/poodl/">
                        GitHub Repository.
                    </a>
                </p>
            </div>
        );
    }
}

export default Landing;

import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Login from './auth/Login';

export class Landing extends Component {
    componentDidMount() {
        // If logged in and an admin navigates to Landing page, redirect them to dashboard
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing-container">
                <div className="landing-body">
                    <div className="landing-header">
                        <h1>Welcome to</h1>
                        <h1 className="landing-title">Poodl</h1>
                        <p className="landing-info">The member management tool for rural senior centers!</p>
                        <a
                            href="https://github.com/dog-house-development/poodl/wiki"
                            className="button large primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn More
                        </a>
                    </div>
                    <Login />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: _.get(state.auth, 'isAuthenticated')
    };
};

export default connect(mapStateToProps)(Landing);

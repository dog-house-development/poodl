import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

export class Landing extends Component {
    componentDidMount() {
        // If logged in and an admin navigates to Landng page, should redirect them to dashboard
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing-container">
                <div className="landing-header">
                    <h1>Welcome to</h1>
                    <h1 className="landing-title">Poodl</h1>
                    <p className="landing-info">The member management tool for rural senior centers!</p>
                    <Link to="/" className="button large primary">
                        Learn more
                    </Link>
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

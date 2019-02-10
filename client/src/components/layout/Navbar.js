import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAdmin } from '../../actions/authActions';

export class Navbar extends Component {
    getHeaderMarkup() {
        if (!this.props.auth.isAuthenticated) {
            return (
                <>
                    <li className="right">
                        <Link to="/register">Sign up</Link>
                    </li>
                    <li className="right">
                        <Link to="/login">Log in</Link>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className="right">
                        <Link to="/dashboard">My Dashboard</Link>
                    </li>
                    <li className="right">
                        <Link to="/activities">Activities</Link>
                    </li>
                </>
            );
        }
    }
    render() {
        return (
            <div className="header">
                <ul>
                    <li className="">
                        <Link to="/">Poodl</Link>
                    </li>
                    {this.getHeaderMarkup()}
                </ul>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        logoutAdmin: () => dispatch(logoutAdmin())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar));

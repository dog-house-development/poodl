import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAdmin } from '../../actions/authActions';

import Button from '../inputs/Button';

class Navbar extends Component {
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
                        <Link to="/register">Activities</Link>
                    </li>
                    <li className="right">
                        <Button
                            content="Sign out"
                            onClick={this.props.logoutAdmin}
                            kind="secondary"
                        />
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

const mapStateToProps = (state, props) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutAdmin: () => dispatch(logoutAdmin())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar));

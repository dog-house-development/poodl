import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthActions from '../../../actions/authActions';
import DynamicForm from '../../ui/DynamicForm';
import loginInputs from './loginInputs';

const propTypes = {
    auth: PropTypes.object.isRequired
};

const defaultProps = {
    errors: {}
};

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // If logged in and admin navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const adminData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.authActions.loginAdmin(adminData);
    };

    render() {
        if (this.props.auth.isAuthenticated) {
            // take the saved previous attempted url and redirect to it otherwise dashboard
            const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
            return <Redirect to={from} />;
        }
        return (
            <div className="login-container page-container">
                <Link to="/" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <div className="panel">
                    <DynamicForm
                        inputs={loginInputs}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        submitButtonLabel="Log in"
                        errors={this.props.errors}
                        values={this.state}
                        errorDescription={this.props.errors.error}
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.auth.errors,
        loading: state.auth.loading
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(AuthActions, dispatch)
    };
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);

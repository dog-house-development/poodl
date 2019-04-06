import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import AuthActions from '../../../actions/authActions';
import Form from '../../ui/Form';

const propTypes = {
    auth: PropTypes.object.isRequired
};

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and admin navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
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

    getFields = () => {
        const { errors } = this.state;
        const fields = [
            {
                id: 'email',
                type: 'email',
                label: 'Email',
                value: this.state.email,
                onChange: this.onChange,
                error: errors.email,
                placeholder: 'Email...',
                autoComplete: 'on'
            },
            {
                id: 'password',
                type: 'password',
                label: 'Password',
                value: this.state.password,
                onChange: this.onChange,
                error: errors.password,
                placeholder: 'Password......',
                autoComplete: 'on'
            }
        ];
        return fields;
    };

    getFormErrors() {
        let errors = [];
        _.each(this.props.errors, (value, key) => {
            if (key.toLowerCase() === 'emailnotfound' || key.toLowerCase() === 'passwordincorrect') {
                errors.push('Email and password combination not found');
            } else if (key !== 'email' && key !== 'password') {
                errors.push(value);
            }
        });
        return errors;
    }

    render() {
        if (this.props.auth.isAuthenticated) {
            // take the saved previous attempted url and redirect to it otherwise dashboard
            const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
            return <Redirect to={from} />;
        }
        return (
            <div className="login-container">
                <Link to="/" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <Form
                    fields={this.getFields()}
                    onSubmit={this.onSubmit}
                    noValidate
                    buttonLabel="Log in"
                    formTitle="Log In"
                    errors={this.getFormErrors()}
                />
                <div className="center">
                    <p>
                        Forgot password?{' '}
                        <Link to="/login" className="button small secondary">
                            Reset
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        errors: state.auth.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(AuthActions, dispatch)
    };
};

Login.propTypes = propTypes;

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);

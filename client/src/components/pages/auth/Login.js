import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router';

import { loginAdmin } from '../../../actions/authActions';
import Form from '../../ui/Form';

const propTypes = {
    loginAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
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
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

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

        this.props.loginAdmin(adminData);
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
                placeholder: 'Email...'
            },
            {
                id: 'password',
                type: 'password',
                label: 'Password',
                value: this.state.password,
                onChange: this.onChange,
                error: errors.password,
                placeholder: 'Password......'
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
        return (
            <div className="login-container">
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
    console.log(state);
    return {
        isAuthenticated: _.get(state.auth, 'isAuthenticated')
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        loginAdmin: adminData => dispatch(loginAdmin(adminData))
    };
};

Login.propTypes = propTypes;

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);

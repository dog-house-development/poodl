import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerAdmin } from '../../../actions/authActions';

import GoHome from '../../ui/GoHome';
import Form from '../../ui/Form';

const propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and admin navigates to Register page, should redirect them to dashboard
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

        const newAdmin = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerAdmin(newAdmin, this.props.history);
    };

    getFields = () => {
        const { errors } = this.state;
        const fields = [
            {
                onChange: this.onChange,
                value: this.state.name,
                error: errors.name,
                id: 'name',
                type: 'text',
                label: 'Name',
                placeholder: 'First Last...'
            },
            {
                onChange: this.onChange,
                value: this.state.email,
                error: errors.email,
                id: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'example@poodl.com...'
            },
            {
                onChange: this.onChange,
                value: this.state.password,
                error: errors.password,
                id: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Shhhhh...'
            },
            {
                onChange: this.onChange,
                value: this.state.password2,
                error: errors.password2,
                id: 'password2',
                type: 'password',
                label: 'Confirm Password',
                placeholder: 'Again...'
            }
        ];
        return fields;
    };

    render() {
        return (
            <div className="register-container">
                <GoHome to="/" className="button small tertiary" buttonOrLink="button" size="small" kind="tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </GoHome>
                <Form
                    noValidate
                    fields={this.getFields()}
                    onSubmit={this.onSubmit}
                    buttonLabel="Register"
                    formTitle="Register Admin"
                />
                <div className="center">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="button small secondary">
                            Log in
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
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        registerAdmin: (adminData, history) => dispatch(registerAdmin(adminData, history))
    };
};

Register.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Register));

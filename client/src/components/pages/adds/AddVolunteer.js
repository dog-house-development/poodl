import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerAdmin } from '../../../actions/authActions';
import _ from 'lodash';

import Form from '../../ui/Form';

const propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export class AddVolunteer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            membershipDate: '',
            seniorCenter: props.adminSeniorCenter,
            errors: {}
        };
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

        const newMember = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: '',
            membershipDate: '',
            seniorCenter: this.state.seniorCenter
        };

        this.props.registerAdmin(newAdmin, this.props.history);
    };

    getFields = () => {
        const { errors } = this.state;
        const fields = [
            {
                onChange: this.onChange,
                error: errors.firstName,
                id: 'firstName',
                type: 'text',
                label: 'First name',
                placeholder: 'John...',
                sideBySide: 1,
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.lastName,
                id: 'lastName',
                type: 'text',
                label: 'Last name',
                placeholder: 'Smith...',
                sideBySide: 2,
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.email,
                id: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'example@poodl.com...',
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.password,
                id: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Shhhhh...',
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.password2,
                id: 'password2',
                type: 'password',
                label: 'Confirm Password',
                placeholder: 'Again...',
                autocomplete: 'off'
            }
        ];
        if (this.props.adminIsSuper) {
            fields.push({
                onChange: this.onChange,
                content: this.props.adminSeniorCenter,
                error: errors.seniorCenter,
                id: 'seniorCenter',
                type: 'text',
                label: 'Senior Center',
                placeholder: 'ID...'
            });
        }
        return fields;
    };

    render() {
        return (
            <div className="register-container">
                <Link to="/dashboard" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <Form
                    noValidate
                    fields={this.getFields()}
                    onSubmit={this.onSubmit}
                    buttonLabel="Register"
                    formTitle="Register Admin"
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        adminIsSuper: _.get(state.auth.admin, 'superAdmin', false),
        adminSeniorCenter: _.get(state.auth.admin, 'seniorCenter'),
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

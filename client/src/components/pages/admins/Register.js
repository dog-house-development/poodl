import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminActions from '../../../actions/adminActions';
import _ from 'lodash';

import Form from '../../ui/Form';

const propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            seniorCenterId: props.adminSeniorCenterId,
            superAdmin: false
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newAdmin = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            seniorCenterId: this.state.seniorCenterId,
            superAdmin: this.state.superAdmin
        };

        this.props.adminActions.create(newAdmin, this.props.history);
    };

    getFields = () => {
        const { errors } = this.props;
        const fields = [
            {
                onChange: this.onChange,
                error: errors.firstName,
                id: 'firstName',
                type: 'text',
                label: 'First name',
                placeholder: 'John...',
                sidebyside: 1,
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.lastName,
                id: 'lastName',
                type: 'text',
                label: 'Last name',
                placeholder: 'Smith...',
                sidebyside: 2,
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.email,
                id: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'example@poodl.com...',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.password,
                id: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Shhhhh...',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.password2,
                id: 'password2',
                type: 'password',
                label: 'Confirm Password',
                placeholder: 'Again...',
                autoComplete: 'off'
            }
        ];
        if (this.props.adminIsSuper) {
            fields.push({
                onChange: this.onChange,
                content: this.props.adminSeniorCenterId,
                error: errors.seniorCenterId,
                id: 'seniorCenterId',
                type: 'text',
                label: 'Senior Center Id',
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
        adminIsSuper: _.get(state.auth.admin, 'accessLevel', false) === 'Super',
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.admins.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        adminActions: bindActionCreators(AdminActions, dispatch)
    };
};

Register.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Register));

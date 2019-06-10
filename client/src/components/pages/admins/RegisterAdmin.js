import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import AdminActions from '../../../actions/adminActions';
import DynamicForm from '../../ui/DynamicForm';
import adminInputs from './adminInputs';

const propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export class RegisterAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seniorCenterId: props.adminSeniorCenterId
        };
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = () => {
        const admin = {
            ...this.state
        };

        this.props.adminActions.create(admin, this.props.history);
    };

    render() {
        return (
            <div className="register-container page-container">
                <Link to="/dashboard" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to home
                </Link>
                <div className="panel">
                    <h1 className="panel-title">Register Admin</h1>
                    <DynamicForm
                        inputs={adminInputs}
                        onChange={this.handleChange}
                        onSubmit={this.onSubmit}
                        submitButtonLabel="Register Admin"
                        errors={this.props.errors}
                        values={this.state}
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        adminIsSuper: _.get(state.auth.admin, 'accessLevel', false) === 'Super',
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.admins.errors,
        loading: state.admins.loading
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        adminActions: bindActionCreators(AdminActions, dispatch)
    };
};

RegisterAdmin.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RegisterAdmin));

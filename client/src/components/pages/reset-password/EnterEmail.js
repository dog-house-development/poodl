import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthActions from '../../../redux/actions/authActions';
import DynamicForm from '../../ui/DynamicForm';

import enterEmailInputs from './enterEmailInputs';

const propTypes = {
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired
};

const defaultProps = {
    errors: {}
};

export class EnterEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSent: false
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = () => {
        this.props.authActions.sendResetPasswordEmail({ email: this.state.email, url: window.location.origin }, () =>
            this.setState({ emailSent: true })
        );
    };

    getFormMarkup() {
        if (this.state.emailSent) {
            return (
                <div className="dynamic-form">
                    <div className="input-group">
                        <h3 className="input-group-label">Success</h3>
                        <p className="input-group-description">
                            An email containing the reset password link was sent to <strong>{this.state.email}</strong>.
                            It may take up to 5 minutes to arrive.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <DynamicForm
                inputs={enterEmailInputs}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                submitButtonLabel="Submit"
                errors={this.props.errors}
                values={this.state}
                errorDescription={this.props.errors.error}
                loading={this.props.loading}
            />
        );
    }

    render() {
        return (
            <div className="enter-email-container page-container">
                <div className="panel">{this.getFormMarkup()}</div>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        errors: state.auth.errors,
        loading: state.auth.loading
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(AuthActions, dispatch)
    };
};

EnterEmail.propTypes = propTypes;
EnterEmail.defaultProps = defaultProps;

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EnterEmail)
);

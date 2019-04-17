import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import DynamicForm from '../../../../ui/DynamicForm';
import MemberActions from '../../../../../actions/memberActions';
import memberInputs from '../../memberInputs';

export class SelfRegisterMember extends React.Component {
    static propTypes = {
        onSignUpSuccess: PropTypes.func
    };

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
        const member = {
            ...this.state
        };

        this.props.memberActions.create(member, null, this.props.onSignUpSuccess);
    };

    render() {
        return (
            <div className="page-container">
                <Link to="/member-check-in" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to check-in
                </Link>
                <div className="panel">
                    <h1 className="panel-title">Sign up</h1>
                    <DynamicForm
                        inputs={memberInputs}
                        onChange={this.handleChange}
                        onSubmit={this.onSubmit}
                        submitButtonLabel="Sign up"
                        errors={this.props.errors}
                        values={this.state}
                        errorDescription="There are errors in this form."
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.members.errors,
        loading: state.members.loading
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelfRegisterMember);

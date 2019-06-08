import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import DynamicForm from '../../../../ui/DynamicForm';
import MemberActions from '../../../../../redux/actions/memberActions';
import memberInputs from '../../memberInputs';
import Button from './../../../../ui/Button';

export class SelfRegisterMember extends React.Component {
    static propTypes = {
        onSignUpSuccess: PropTypes.func,
        goBack: PropTypes.func
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
                <Button icon="keyboard_backspace" onClick={this.props.goBack} kind="tertiary">
                    Back to check-in
                </Button>
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

import React from 'react';
import PropTypes from 'prop-types';
import DynamicForm from '../../ui/DynamicForm';
import memberInputs from './memberInputs';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MemberActions from '../../../actions/memberActions';
import _ from 'lodash';

export class RegisterMember extends React.Component {
    static propTypes = {
        errors: PropTypes.object
    };

    static defaultProps = {
        errors: {}
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

        this.props.memberActions.create(member, this.props.history);
    };

    render() {
        return (
            <div className="register-container">
                <Link to="/members" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all members
                </Link>
                <div className="panel">
                    <h1 className="panel-title">Register Member</h1>
                    <DynamicForm
                        inputs={memberInputs}
                        onChange={this.handleChange}
                        onSubmit={this.onSubmit}
                        submitButtonLabel="Register Member"
                        errors={this.props.errors}
                        values={this.state}
                        errorDescription="There are errors in this form."
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.members.errors
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
)(RegisterMember);

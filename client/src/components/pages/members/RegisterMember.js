import React from 'react';
import PropTypes from 'prop-types';
import DynamicForm from '../../ui/DynamicForm';
import memberInputs from './memberInputs';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MemberActions from '../../../redux/actions/memberActions';

export class RegisterMember extends React.Component {
    static propTypes = {
        errors: PropTypes.object
    };

    static defaultProps = {
        errors: {}
    };

    constructor(props) {
        super(props);
        this.state = {};
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
            <div className="page-container">
                <Link to="/members" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to all members
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
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
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

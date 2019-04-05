import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MemberActions from '../../../actions/memberActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';
import memberFields, { Categories } from './memberFields';
import EditableProfile from '../../ui/EditableProfile';
import DynamicForm from '../../ui/DynamicForm';
import memberInputs from './memberInputs';

export class MemberProfile extends Component {
    static defaultProps = {
        errors: {}
    };

    componentDidMount() {
        // call redux action to retrieve specified profile from api
        this.props.memberActions.get(this.props.match.params.id);
    }

    componentDidUpdate() {
        console.log('member', this.props.member);
    }

    editMember = (modifiedInputs, onSuccess) => {
        this.props.memberActions.edit(_.get(this.props.member, '_id'), modifiedInputs, onSuccess);
    };

    getFormMarkup() {
        return (
            <div>
                <h1>
                    {_.get(this.props.member, 'firstName')} {_.get(this.props.member, 'lastName')}
                </h1>

                <DynamicForm
                    inputs={memberInputs}
                    editValues={this.editMember}
                    getValues={this.props.memberActions.get}
                    values={this.props.member}
                    editable={true}
                    loading={this.props.loading}
                    errors={this.props.errors}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="view-all-container">
                <Link to="/members" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all members
                </Link>
                {this.getFormMarkup()}
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        member: state.members.all[props.match.params.id],
        loading: state.members.loading,
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
)(MemberProfile);

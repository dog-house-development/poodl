import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import MemberActions from '../../../actions/memberActions';
import DynamicForm from '../../ui/DynamicForm';
import memberInputs from './memberInputs';
import ManageServices from '../services/ManageServices';
import TabPage from '../../ui/TabPage';

export class MemberProfile extends Component {
    static defaultProps = {
        errors: {}
    };

    componentDidMount() {
        // call redux action to retrieve specified profile from api
        this.props.memberActions.get(this.props.match.params.id);
    }

    editMember = (modifiedInputs, onSuccess) => {
        this.props.memberActions.edit(_.get(this.props.member, '_id'), modifiedInputs, onSuccess);
    };

    getTabs() {
        return [
            {
                id: 'memberInfo',
                label: 'Info',
                content: (
                    <DynamicForm
                        inputs={memberInputs}
                        editValues={this.editMember}
                        values={this.props.member}
                        editable={true}
                        loading={this.props.loading}
                        errors={this.props.errors}
                    />
                )
            },
            {
                id: 'services',
                label: 'Services',
                content: <ManageServices memberId={this.props.match.params.id} />
            }
        ];
    }

    render() {
        return (
            <div className="view-all-container">
                <Link to="/members" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all members
                </Link>
                <h1>
                    {_.get(this.props.member, 'firstName')} {_.get(this.props.member, 'lastName')}
                </h1>
                <TabPage tabs={this.getTabs()} startingTab="memberInfo" />
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

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import MemberActions from '../../../redux/actions/memberActions';
import ServiceActions from '../../../redux/actions/serviceActions';
import DynamicForm from '../../ui/DynamicForm';
import memberInputs from './memberInputs';
import ManageServices from '../services/ManageServices';
import TabPage from '../../ui/TabPage';
import Loading from '../../ui/Loading';
import ConfirmButton from '../../ui/ConfirmButton';
import Dropdown from '../../ui/Dropdown';

export class MemberProfile extends Component {
    static defaultProps = {
        errors: {}
    };

    componentDidMount() {
        // call redux action to retrieve specified profile from api
        this.props.memberActions.get(this.props.match.params.id, _.noop, () => {
            this.props.history.push('/pageNotFound');
        });
        this.props.serviceActions.filter();
        window.scrollTo(0, 0);
    }

    editMember = (modifiedInputs, onSuccess) => {
        this.props.memberActions.edit(_.get(this.props.member, '_id'), modifiedInputs, onSuccess);
    };

    getTabs() {
        return [
            {
                id: 'memberInfo',
                label: 'Info',
                icon: 'account_box',
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
                icon: 'list_alt',
                count: this.props.serviceCount,
                content: <ManageServices data={this.props.services} memberId={this.props.match.params.id} />
            }
        ];
    }

    getMemberName() {
        return this.props.loading ? (
            <Loading content="" />
        ) : (
            _.get(this.props.member, 'firstName') + ' ' + _.get(this.props.member, 'lastName')
        );
    }

    handleDeleteClick = () => {
        this.props.memberActions.delete(this.props.match.params.id, () => this.props.history.push('/members'));
    };

    render() {
        return (
            <div className="page-container">
                <Link to="/members" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to all members
                </Link>
                <div className="page-header">
                    <h1>{this.getMemberName()}</h1>
                    <div className="button-list">
                        <Dropdown icon="more_vert" kind="tertiary" align="right">
                            <ConfirmButton
                                className="dropdown-content-row medium"
                                onConfirm={this.handleDeleteClick}
                                title="Confirm Delete"
                                message={`Are you sure you want to delete the member '${this.getMemberName()}'?`}>
                                Delete Member
                            </ConfirmButton>
                        </Dropdown>
                    </div>
                </div>
                <TabPage tabs={this.getTabs()} startingTab="memberInfo" />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        member: state.members.all[props.match.params.id],
        loading: state.members.loading,
        errors: state.members.errors,
        serviceCount: _.size(_.filter(state.services.all, service => service.memberId === props.match.params.id))
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch),
        serviceActions: bindActionCreators(ServiceActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberProfile);

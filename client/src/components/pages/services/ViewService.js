import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

import ServiceActions from '../../../actions/serviceActions';
import MemberActions from '../../../actions/memberActions';
import DynamicForm from '../../ui/DynamicForm';
import Button from '../../ui/Button';
import List from '../../ui/List';
import serviceInputs from './serviceInputs';

export class ViewService extends Component {
    static defaultProps = {
        errors: {}
    };

    componentDidMount() {
        // call redux action to retrieve specified profile from api
        this.props.serviceActions.filter();
        this.props.memberActions.filter();
    }

    editService = (modifiedInputs, onSuccess) => {
        this.props.serviceActions.edit(_.get(this.props.service, '_id'), modifiedInputs, onSuccess);
    };

    getFormMarkup() {
        return (
            <div>
                <h1 className="view-all-header">
                    {_.get(this.props.service, 'name')}
                    <Button
                        onClick={() => this.props.serviceActions.delete(this.props.match.params.id, this.props.history)}
                        size="small"
                        className="delete-button">
                        <i className="material-icons button-icon">remove_circle_outline</i>Remove service
                    </Button>
                </h1>
                <DynamicForm
                    inputs={serviceInputs}
                    editValues={this.editService}
                    getValues={this.props.serviceActions.get}
                    values={this.props.service}
                    editable={true}
                    loading={this.props.loading}
                    errors={this.props.errors}
                    data={{ name: this.props.services }}
                />
                <List
                    data={[
                        {
                            main: _.get(this.props.member, 'firstName') + ' ' + _.get(this.props.member, 'lastName'),
                            secondary: _.get(this.props.member, 'email'),
                            key: _.get(this.props.member, '_id', _.uniqueId('list-row'))
                        }
                    ]}
                    name="Member"
                    loading={this.props.memberLoading}
                    onRowClick={e => this.props.history.push(`/members/${e.target.id}`)}
                    noDataMessage="Member not found for this service"
                />
            </div>
        );
    }

    render() {
        return (
            <div className="view-all-container view-service">
                <Link to={`/members/${_.get(this.props.service, 'memberId')}`} className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to member
                </Link>
                {this.getFormMarkup()}
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    const service = state.services.all[props.match.params.id];
    return {
        service: service,
        services: state.services.all,
        loading: state.services.loading,
        errors: state.services.errors,
        member: state.members.all[_.get(service, 'memberId')],
        memberLoading: state.members.loading,
        memberErrors: state.members.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        serviceActions: bindActionCreators(ServiceActions, dispatch),
        memberActions: bindActionCreators(MemberActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewService));

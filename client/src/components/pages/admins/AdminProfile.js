import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import _ from 'lodash';
import Loading from '../../ui/Loading';
import { DeleteButton } from './../../ui/DeleteButton';
import AdminActions from '../../../actions/adminActions';
import DynamicForm from '../../ui/DynamicForm';
import adminInputs from './adminInputs';

export class AdminProfile extends Component {
    componentDidMount() {
        this.props.adminActions.get(this.props.match.params.id);
    }

    getAdminName() {
        return this.props.loading ? (
            <Loading content="" />
        ) : (
            _.get(this.props.admin, 'firstName') + ' ' + _.get(this.props.admin, 'lastName')
        );
    }

    handleDeleteClick = () => {
        this.props.adminActions.delete(this.props.match.params.id, () => this.props.history.push('/admins'));
    };

    editAdmin = (modifiedInputs, onSuccess) => {
        this.props.adminActions.edit(_.get(this.props.admin, '_id'), modifiedInputs, onSuccess);
    };

    render() {
        return (
            <div className="page-container">
                <Link to="/admins" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all admins
                </Link>
                <div className="page-header">
                    <h1>{this.getAdminName()}</h1>
                    <DeleteButton
                        onConfirm={this.handleDeleteClick}
                        confirmQuestion={`Are you sure you want to delete the admin '${this.getAdminName()}'?`}>
                        Delete Admin
                    </DeleteButton>
                </div>
                <DynamicForm
                    inputs={adminInputs}
                    editValues={this.editAdmin}
                    values={this.props.admin}
                    editable={true}
                    loading={this.props.loading}
                    errors={this.props.errors}
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        admin: state.admins.all[props.match.params.id],
        loading: state.admins.loading,
        errors: state.admins.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        adminActions: bindActionCreators(AdminActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProfile);

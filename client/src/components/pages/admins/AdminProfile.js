import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import AdminActions from '../../../actions/adminActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';
import adminFields, { Categories } from './adminFields';
import EditableProfile from '../../ui/EditableProfile';
import { DeleteButton } from './../../ui/DeleteButton';
export class AdminProfile extends Component {
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

    render() {
        return (
            <div className="view-all-container page-container">
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
                <EditableProfile
                    fields={adminFields}
                    categories={Categories}
                    editProfile={this.props.adminActions.edit}
                    getProfile={this.props.adminActions.get}
                    profile={this.props.admin}
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

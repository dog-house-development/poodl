import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';

import AdminActions from '../../../redux/actions/adminActions';
import DataGrid from '../../ui/DataGrid';

export class ViewAllAdmins extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        // call redux action to retrieve all admins from api
        this.props.adminActions.filter();
    }

    handleRowClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/admins/${id}`);
    }

    getSuperColumnData(admin) {
        if (this.props.adminIsSuper) {
            return { super: admin.accessLevel === 'Super' ? 'Yes' : 'No' };
        }
    }

    getDataGridContent() {
        // choose what we want to display out of the admins data
        let data = [];
        _.each(this.props.admins, admin => {
            // we want admins' names and emails, and we need a key which will not be displayed
            data.push({
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                ...this.getSuperColumnData(admin),
                key: admin._id
            });
        });
        return data;
    }

    render() {
        return (
            <div className="page-container">
                <Link to="/dashboard" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to home
                </Link>
                <div className="page-header">
                    <h1>Admins</h1>
                    <div className="button-list">
                        <Link to="/admins/register" className="button small primary icon">
                            <i className="material-icons button-icon">person_add</i>
                            Add admin
                        </Link>
                    </div>
                </div>
                <DataGrid
                    data={this.getDataGridContent()}
                    loading={this.props.loading}
                    onRowClick={this.handleRowClick}
                    noDataMessage="No admins to display"
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        admins: state.admins.all,
        loading: state.admins.loading,
        errors: state.admins.errors,
        adminIsSuper: state.auth.admin.accessLevel === 'Super'
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
)(withRouter(ViewAllAdmins));

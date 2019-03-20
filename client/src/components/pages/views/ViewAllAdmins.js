import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';

import { fetchAdmins } from '../../../actions/adminActions';
import DataGrid from '../../ui/DataGrid';

export class ViewAllAdmins extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        // call redux action to retrieve all admins from api
        this.props.getAdmins();
    }

    handleRowClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/admins/${id}`);
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
                super: admin.accessLevel === 'Super' ? 'Yes' : 'No',
                key: admin._id
            });
        });
        return data;
    }

    render() {
        return (
            <div className="view-all-container">
                <Link to="/dashboard" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <div className="view-all-header">
                    <h1>Manage Admins</h1>
                    <Link to="/register" className="button small primary">
                        <i className="material-icons button-icon">add</i>
                        Add admin
                    </Link>
                </div>
                <DataGrid
                    data={this.getDataGridContent()}
                    loading={this.props.loading}
                    onRowClick={this.handleRowClick}
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        admins: state.admins.all,
        loading: state.admins.loading,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getAdmins: () => dispatch(fetchAdmins())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewAllAdmins));

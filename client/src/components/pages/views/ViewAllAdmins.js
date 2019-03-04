import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchAdmins } from '../../../actions/adminActions';
import DataGrid from '../../ui/DataGrid';

export class ViewAllAdmins extends Component {
    componentDidMount() {
        // call redux action to retrieve all admins from api
        this.props.getAdmins();
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
                super: admin.superAdmin ? 'Yes' : 'No',
                key: admin._id,
                viewProfile: (
                    <Link to={'/admin/' + admin._id} className="button medium primary">
                        View
                    </Link>
                )
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
                <h1>View All Admins</h1>
                <DataGrid data={this.getDataGridContent()} loading={this.props.loading} />
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
)(ViewAllAdmins);

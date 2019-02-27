import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchMembers } from '../../../actions/memberActions';
import DataGrid from '../../ui/DataGrid';

export class ViewAllMembers extends Component {
    componentDidMount() {
        // call redux action to retrieve all members from api
        this.props.getMembers();
    }

    getDataGridContent() {
        // choose what we want to display out of the members data
        let data = [];
        _.each(this.props.members, member => {
            // we want members' names, emails and membership dates.
            data.push({
                key: member._id,
                firstName: member.firstName,
                lastName: member.lastName,
                membershipDate: member.membershipDate,
                email: member.email
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
                <h1>View All Members</h1>
                <DataGrid data={this.getDataGridContent()} loading={this.props.loading} />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        loading: state.members.loading,
        members: state.members.all.data,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getMembers: () => dispatch(fetchMembers())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllMembers);

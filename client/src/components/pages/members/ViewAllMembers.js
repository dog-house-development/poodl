import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMembers } from '../../../actions/memberActions';
import DataGrid from '../../ui/DataGrid';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class ViewAllMembers extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        // call redux action to retrieve all members from api
        this.props.getMembers();
    }

    handleRowClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/members/${id}`);
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
                membershipDate: moment(member.membershipDate).format('MMMM Do, YYYY'),
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
                <h1>Manage Members</h1>
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
        members: state.members.all,
        loading: state.members.loading,
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

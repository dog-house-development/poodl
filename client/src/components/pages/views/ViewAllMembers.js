import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchMembers } from '../../../actions/memberActions';
import DataGrid from '../../ui/DataGrid';
import { Link } from 'react-router-dom';

export class ViewAllMembers extends Component {
    onViewClick = (e, memberID) => {
        e.preventDefault();
        this.props.history.push('/memberProfile/:id', memberID);
    };
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
                email: member.email,
                //on click needs
                viewProfile: (
                    <Link to={'/member/' + member._id} className="button large primary">
                        {' '}
                        View{' '}
                    </Link>
                )
            });
        });
        return data;
    }

    render() {
        return (
            <div className="view-all-container">
                <h1>View All Members</h1>
                <DataGrid data={this.getDataGridContent()} loading={this.props.loading} />
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

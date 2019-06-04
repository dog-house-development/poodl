import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import React, { Component } from 'react';
import _ from 'lodash';
import MemberActions from '../../../actions/memberActions';
import DataGrid from '../../ui/DataGrid';

export class ViewAllMembers extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        // call redux action to retrieve all members from api
        this.props.memberActions.filter();
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

    getDataGridColumns() {
        return [
            {
                key: 'firstName'
            },
            {
                key: 'lastName'
            },
            {
                key: 'membershipDate',
                markup: membershipDate => moment(membershipDate).format('MMMM Do, YYYY')
            },
            {
                key: 'email'
            }
        ];
    }

    render() {
        return (
            <div className="page-container">
                <Link to="/dashboard" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to home
                </Link>
                <div className="page-header">
                    <h1>Members</h1>
                    <div className="button-list">
                        <Link to="/members/register" className="button small primary icon">
                            <i className="material-icons button-icon">person_add</i>
                            Register Member
                        </Link>
                        <Link to="/member-check-in" className="button small primary icon">
                            <i className="material-icons button-icon">how_to_reg</i>
                            Member check-in
                        </Link>
                    </div>
                </div>
                <DataGrid
                    data={this.props.members}
                    columns={this.getDataGridColumns()}
                    loading={this.props.loading}
                    onRowClick={this.handleRowClick}
                    includeExport
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        members: state.members.all,
        loading: state.members.loading,
        errors: state.members.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllMembers);

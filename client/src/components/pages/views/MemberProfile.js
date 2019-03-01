import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchMember } from '../../../actions/memberActions';
import DataGrid from '../../ui/DataGrid';

export class MemberProfile extends Component {
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.id;
    }
    
    componentDidMount() {
        // call redux action to retrieve all members from api
        this.props.getMember(this.routeParam);
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
        /*    <div className="view-all-container">
                <h1>View All Members</h1>
                <DataGrid data={this.getDataGridContent()} loading={this.props.loading} />
            </div>
            */
            <p> Hello, {this.props.member.firstName} </p>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        //loading: state.member.loading,
        member: state.members.member,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getMember: id => dispatch(fetchMember(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberProfile);

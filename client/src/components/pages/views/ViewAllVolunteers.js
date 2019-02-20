import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchVolunteers } from '../../../actions/volunteerActions';
import DataGrid from '../../ui/DataGrid';

export class ViewAllVolunteers extends Component {
    componentDidMount() {
        // call redux action to retrieve all volunteers from api
        this.props.getVolunteers();
    }

    getDataGridContent() {
        // choose what we want to display out of the volunteers data
        let data = [];
        _.each(this.props.volunteers, volunteer => {
            // we want volunteers' names and emails, and we need a key which will not be displayed
            data.push({
                firstName: volunteer.firstName,
                lastName: volunteer.lastName,
                email: volunteer.email,
                key: volunteer._id
            });
        });
        return data;
    }

    render() {
        return (
            <div className="view-all-container">
                <h1>View All Volunteers</h1>
                <DataGrid data={this.getDataGridContent()} loading={this.props.loading} />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        volunteers: state.volunteers.all.data,
        loading: state.volunteers.loading,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getVolunteers: () => dispatch(fetchVolunteers())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllVolunteers);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchVolunteers } from '../../../actions/volunteerActions';
import DataGrid from '../../ui/DataGrid';
import { Link } from 'react-router-dom';

export class ViewAllVolunteers extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        // call redux action to retrieve all volunteers from api
        this.props.getVolunteers();
    }

    handleRowClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/volunteers/${id}`);
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
                <Link to="/dashboard" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <h1>View All Volunteers</h1>
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
        volunteers: state.volunteers.all,
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

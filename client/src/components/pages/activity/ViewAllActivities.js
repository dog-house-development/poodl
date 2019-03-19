import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchActivities } from '../../../actions/activityActions';
import DataGrid from '../../ui/DataGrid';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class ViewAllActivities extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        this.props.getActivities();
    }

    handleRowClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/activity/${id}`);
    }

    getDataGridContent() {
        let data = [];
        _.each(this.props.activities, activity => {
            data.push({
                name: activity.name,
                key: activity._id,
                startDate: moment(activity.startDate).format('MMMM Do, YYYY'),
                endDate: moment(activity.endDate).format('MMMM Do, YYYY')
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
                    <h1>Manage Activities</h1>
                    <Link to="/activities/add" className="button small primary">
                        <i className="material-icons button-icon">add</i>
                        Add Activity
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
        activities: state.activities.all,
        loading: state.activities.loading,
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getActivities: () => dispatch(fetchActivities())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllActivities);

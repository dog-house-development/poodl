import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import ActivityActions from '../../../redux/actions/activityActions';
import DataGrid from '../../ui/DataGrid';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class ViewAllActivities extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        this.props.activityActions.filter();
    }

    handleRowClick(e, id) {
        e.preventDefault();
        this.props.history.push(`/activities/${id}`);
    }

    getDataGridContent() {
        let data = [];
        _.each(this.props.activities, activity => {
            data.push({
                name: activity.name,
                key: activity._id,
                date: moment(activity.startDate).format('MMMM Do, YYYY'),
                time: `${moment(activity.startDate).format('h:mm a')} - ${moment(activity.endDate).format('h:mm a')}`,
                memberCount: activity.members.length
            });
        });
        return data;
    }

    render() {
        return (
            <div className="page-container">
                <Link to="/dashboard" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to home
                </Link>
                <div className="page-header">
                    <h1>Activities</h1>
                    <div className="button-list">
                        <Link to="/activities/add" className="button small primary icon">
                            <i className="material-icons button-icon">add</i>
                            Add Activity
                        </Link>
                    </div>
                </div>
                <DataGrid
                    data={this.getDataGridContent()}
                    loading={this.props.loading}
                    onRowClick={this.handleRowClick}
                    sortBy={activity => moment(activity.date, 'MMMM Do, YYYY')}
                    noDataMessage="No activities to display"
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        activities: state.activities.all,
        loading: state.activities.loading,
        errors: state.activities.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        activityActions: bindActionCreators(ActivityActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllActivities);

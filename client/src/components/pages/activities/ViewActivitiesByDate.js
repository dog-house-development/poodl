import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import ActivityActions from '../../../actions/activityActions';
import ViewByDate from '../../ui/ViewByDate';

export class ViewActivitiesByDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityDate: moment().startOf('day')
        };
    }

    getDateRangeFilter(start) {
        const filter = {
            startDate: {
                $lt: start
                    .clone()
                    .add(1, 'days')
                    .toISOString()
            },
            endDate: {
                $gt: start.toISOString()
            }
        };

        return filter;
    }

    componentDidMount() {
        this.props.activityActions.filter(this.getDateRangeFilter(this.state.activityDate));
    }

    requestDate = date => {
        this.setState({ activityDate: date });
        this.props.activityActions.filter(this.getDateRangeFilter(date));
    };

    render() {
        return (
            <div>
                <h2>Activities</h2>
                <ViewByDate
                    requestDate={this.requestDate}
                    loading={this.props.activitiesLoading}
                    dateData={{
                        date: this.state.activityDate,
                        data: this.props.activities
                    }}
                    clickableRowRoute="activities/"
                    errors={this.props.errors}
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        activities: state.activities.all,
        activitiesLoading: state.activities.loading,
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
)(ViewActivitiesByDate);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ActivityActions from '../../../../../actions/activityActions';
// import Loading from '../../../ui/Loading';
import Button from '../../../../ui/Button';
import formatDateRange from '../../../../../utils/formatDateRange';

export class SelectActivities extends Component {
    componentDidMount() {
        const today = moment().startOf('day');
        this.props.activityActions.filter({
            startDate: {
                $lte: today
                    .clone()
                    .add(1, 'days')
                    .toISOString()
            },
            endDate: {
                $gte: today.toISOString()
            }
        });
    }

    getSelectedActivitiesMarkup() {
        let activities = _.map(this.props.activities, activity => {
            if (_.includes(activity.members, this.props.memberId)) {
                return (
                    <div key={activity._id} className="selected-activity-panel-wrapper">
                        <div className="selected-activity-panel">
                            <h3 className="activity-name">{activity.name}</h3>
                            <p className="activity-description">{activity.description}</p>
                            <p className="activity-description">
                                {formatDateRange(activity.startDate, activity.endDate)}
                            </p>
                            <div className="activity-button">{this.getActivityButtonMarkup(activity)}</div>
                        </div>
                    </div>
                );
            }
            return;
        });
        activities = _.filter(activities, activity => !_.isUndefined(activity));
        if (activities.length !== 0) {
            return activities;
        }
        return <p>Activities that you are signed up for will appear here</p>;
    }

    getActivityButtonMarkup(activity) {
        if (_.includes(activity.members, this.props.memberId)) {
            return (
                <div className="activity-button-wrapper">
                    <Button
                        onClick={() => {
                            this.props.activityActions.edit(activity._id, {
                                members: [..._.remove(activity.members, this.props.memberId)]
                            });
                        }}
                        kind="secondary">
                        <i className="material-icons button-icon">assignment_turned_in</i>
                        Signed up
                    </Button>
                </div>
            );
        }
        return (
            <div className="activity-button-wrapper">
                <Button
                    onClick={() => {
                        this.props.activityActions.edit(activity._id, {
                            members: [...activity.members, this.props.memberId]
                        });
                    }}>
                    <i className="material-icons button-icon">assignment</i>
                    Sign up
                </Button>
            </div>
        );
    }

    getActivitiesMarkup() {
        return _.map(this.props.activities, activity => {
            return (
                <div key={activity._id} className="select-activity-panel-wrapper">
                    <div className="select-activity-panel">
                        <h3 className="activity-name">{activity.name}</h3>
                        <p className="activity-description">{activity.description}</p>
                        <p className="activity-description">{formatDateRange(activity.startDate, activity.endDate)}</p>
                        <div className="activity-button">{this.getActivityButtonMarkup(activity)}</div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2 className="panel-title">
                    Hello {this.props.member.firstName} {this.props.member.lastName}!
                </h2>
                <p>You last checked in {moment(_.last(_.get(this.props.member, 'checkIns'))).fromNow()}</p>
                <div className="selected-activities-panel">
                    <div className="panel">
                        <h2 className="panel-title">Activities that you are signed up for today</h2>
                        <div>{this.getSelectedActivitiesMarkup()}</div>
                    </div>
                </div>
                <div className="selectable-activities-panel">
                    <div className="panel">
                        <h2 className="panel-title">Sign up for activities happening today</h2>
                        <div className="select-activity-panels-container">{this.getActivitiesMarkup()}</div>
                    </div>
                </div>
                <div className="clear" />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        activities: state.activities.all,
        activitiesLoading: state.activities.loading,
        activityErrors: state.activities.errors,
        member: _.find(state.members.all, { _id: props.memberId })
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
)(SelectActivities);

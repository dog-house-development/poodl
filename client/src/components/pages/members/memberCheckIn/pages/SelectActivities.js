import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ActivityActions from '../../../../../redux/actions/activityActions';
import Button from '../../../../ui/Button';
import Utils from '../../../../../utils/Utils';

const propTypes = {
    memberId: PropTypes.string
};

export class SelectActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEndedActivities: props.isSuper
        };
    }

    componentDidMount() {
        if (this.props.isSuper) {
            this.props.activityActions.filter();
        } else {
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
    }

    getActivityNoticeMarkup(activity) {
        // ended, ending soon, happening now, starting soon
        if (moment(activity.endDate).isBefore(moment())) {
            return <p className="activity-ended">Ended</p>;
        } else if (
            moment(activity.endDate)
                .subtract(5, 'minutes')
                .isBefore(moment())
        ) {
            return <p className="activity-ending-soon">Ending {moment(activity.endDate).fromNow()}</p>;
        } else if (moment(activity.startDate).isBefore(moment()) && moment(activity.endDate).isAfter(moment())) {
            return <p className="activity-happening">Happening now</p>;
        } else if (
            moment(activity.startDate)
                .subtract(10, 'minutes')
                .isBefore(moment())
        ) {
            return <p className="activity-starting-soon">Starting {moment(activity.startDate).fromNow()}</p>;
        }
        return <p className="activity-starting-not-soon">Starting {moment(activity.startDate).fromNow()}</p>;
    }

    getSelectedActivitiesMarkup() {
        let activities = _.map(this.props.activities, activity => {
            if (_.includes(activity.members, this.props.memberId)) {
                return (
                    <div key={activity._id} className="selected-activity-panel-wrapper">
                        <div className="selected-activity-panel">
                            {this.getActivityMarkup(activity)}
                            <div className="activity-button">{this.getActivityButtonMarkup(activity, true)}</div>
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

    removeMemberFromActivity(activity) {
        return _.pull(activity.members, this.props.memberId);
    }

    removeActivity = activity => () => {
        this.props.activityActions.edit(activity._id, {
            members: this.removeMemberFromActivity(activity)
        });
    };

    getActivityButtonMarkup(activity, selected) {
        if (_.includes(activity.members, this.props.memberId)) {
            return (
                <div className="activity-button-wrapper">
                    <Button
                        onClick={this.removeActivity(activity)}
                        kind="secondary"
                        icon={selected ? 'remove_circle' : 'assignment_turned_in'}
                        disabled={this.props.activitiesLoading}>
                        {selected ? 'Remove' : 'Signed Up'}
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
                    }}
                    icon="assignment"
                    disabled={this.props.activitiesLoading}>
                    Sign up
                </Button>
            </div>
        );
    }

    getDateIfSuper(activity) {
        if (this.props.isSuper) {
            return <p className="activity-description">{moment(activity.startDate).format('MMMM Do, YYYY')}</p>;
        }
    }

    getActivityMarkup(activity) {
        return (
            <>
                <h3 className="activity-name">{activity.name}</h3>
                <p className="activity-description">{activity.description}</p>
                <p className="activity-description">{Utils.formatDateRange(activity.startDate, activity.endDate)}</p>
                {this.getDateIfSuper(activity)}
                {this.getActivityNoticeMarkup(activity)}
            </>
        );
    }

    getSortedActivities() {
        if (this.props.isSuper) {
            return _.sortBy(this.props.activities, activity => activity.startDate);
        }

        return this.props.activities;
    }

    getActivitiesMarkup() {
        return _.map(this.getSortedActivities(), activity => {
            if (moment(activity.endDate).isAfter(moment()) || this.state.showEndedActivities) {
                return (
                    <div key={activity._id} className="select-activity-panel-wrapper">
                        <div className="select-activity-panel">
                            {this.getActivityMarkup(activity)}
                            <div className="activity-button">{this.getActivityButtonMarkup(activity)}</div>
                        </div>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div>
                <h2 className="panel-title">
                    Hello {this.props.member.firstName} {this.props.member.lastName}!
                </h2>
                {_.last(_.get(this.props.member, 'checkIns')) ? (
                    <p className="last-check-in">
                        You last checked in {moment(_.last(_.get(this.props.member, 'checkIns'))).fromNow()}
                    </p>
                ) : (
                    <p className="last-check-in">Welcome! This is your first time checking in.</p>
                )}
                <div className="selected-activities-panel">
                    <div className="panel">
                        <h2 className="panel-title">
                            {`Activities that you are signed up for${this.props.isSuper ? '' : ' today'}`}
                        </h2>
                        <hr />
                        <div>{this.getSelectedActivitiesMarkup()}</div>
                    </div>
                </div>
                <div className="selectable-activities-panel">
                    <div className="panel">
                        <h2 className="panel-title">
                            {`Sign up for activities${this.props.isSuper ? '' : ' happening today'}`}
                        </h2>
                        {this.props.isSuper ? null : (
                            <Button
                                size="small"
                                content={
                                    this.state.showEndedActivities ? 'Hide ended activities' : 'Show ended activities'
                                }
                                onClick={() => this.setState({ showEndedActivities: !this.state.showEndedActivities })}
                            />
                        )}

                        <hr />
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
        member: _.find(state.members.all, { _id: props.memberId }),
        isSuper: state.auth.admin.accessLevel === 'Super'
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        activityActions: bindActionCreators(ActivityActions, dispatch)
    };
};

SelectActivities.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectActivities);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ActivityActions from '../../../../../actions/activityActions';
// import Loading from '../../../ui/Loading';
import Button from '../../../../ui/Button';

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

    getActivitiesMarkup() {
        return _.map(this.props.activities, activity => {
            return (
                <div key={activity._id} className="panel">
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                    <Button onClick={() => console.log('sign up for this activity')} content="Sign up" />
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>
                    Hello {this.props.member.firstName} {this.props.member.lastName}!
                </h2>
                <h3>Sign up for activities happening today</h3>
                {this.getActivitiesMarkup()}
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

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MemberActions from '../../../actions/memberActions';
import ActivityActions from '../../../actions/activityActions';
import { Link } from 'react-router-dom';
import Loading from '../../ui/Loading';

export class Reports extends React.Component {
    componentDidMount() {
        this.props.activityActions.filter();
        this.props.memberActions.filter();
    }

    getActivityReport = activityName => {
        const activitiesWithName = _.filter(this.props.activities, { name: activityName });

        let duplicatedMembers = [];

        _.forEach(activitiesWithName, activity => {
            duplicatedMembers.push(...activity.members);
        });

        const unduplicatedMembers = _.uniq(duplicatedMembers);

        console.log('total', duplicatedMembers);

        return (
            <div key={activityName} className="activity-report">
                <h3>{activityName}</h3>
                <div className="activity-info">
                    <h4>Duplicated Members</h4>
                    <p>{duplicatedMembers.length}</p>
                    <h4>Unduplicated Members</h4>
                    <p>{unduplicatedMembers.length}</p>
                </div>
            </div>
        );
    };

    getUniqueActivities() {
        const uniqueData = _.uniq(_.map(this.props.activities, item => item.name));
        const sortedData = _.sortBy(uniqueData, [item => item.toLowerCase()]);
        console.log(sortedData);
        return sortedData;
    }

    getActivitiesReports() {
        return _.map(this.getUniqueActivities(), this.getActivityReport);
    }

    getTotalMemberCheckIns() {
        return _.reduce(
            this.props.members,
            (sum, member) => {
                return sum + member.checkIns.length;
            },
            0
        );
    }

    getMembersReports() {
        return (
            <>
                <h3>Total Member Check Ins</h3>
                <p>{this.getTotalMemberCheckIns()}</p>
            </>
        );
    }

    getReportsMarkup() {
        if (this.props.loading) {
            return <Loading />;
        }

        return (
            <div className="reports-content">
                <div className="panel reports-activities">
                    <h2>Activities</h2>
                    {this.getActivitiesReports()}
                </div>
                <div className="panel reports-members">
                    <h2>Members</h2>
                    {this.getMembersReports()}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="reports-container">
                <Link to="/" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <h1>Reports</h1>

                {this.getReportsMarkup()}
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        activities: _.get(state.activities, 'all'),
        members: _.get(state.members, 'all'),
        errors: state.members.errors,
        loading: _.get(state.activities, 'loading') || _.get(state.members, 'loading')
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        memberActions: bindActionCreators(MemberActions, dispatch),
        activityActions: bindActionCreators(ActivityActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reports);

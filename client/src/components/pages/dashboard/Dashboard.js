import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActivityActions from '../../../actions/activityActions';
import ViewByDate from '../../ui/ViewByDate';
import moment from 'moment';

const propTypes = {
    auth: PropTypes.object.isRequired
};

export class Dashboard extends Component {
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
        const { admin } = this.props.auth;

        return (
            <div className="dashboard-container">
                <h2>Hey there, </h2>
                <h1>{admin.firstName + ' ' + admin.lastName}.</h1>
                <div className="panel dashboard-panel">
                    <Link to="/admins" className="button primary medium">
                        Admins
                    </Link>
                    <Link to="/volunteers" className="button primary medium">
                        Volunteers
                    </Link>
                    <Link to="/members" className="button primary medium">
                        Members
                    </Link>
                    <Link to="/activities" className="button primary medium">
                        Activities
                    </Link>
                    <Link to="/reports" className="button primary medium">
                        Reports
                    </Link>
                </div>
                <h2>Activities</h2>
                <ViewByDate
                    requestDate={this.requestDate}
                    loading={this.props.activitiesLoading}
                    dateData={{
                        date: this.state.activityDate,
                        data: this.props.activities
                    }}
                    clickableRowRoute="activity/"
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

Dashboard.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

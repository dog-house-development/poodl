import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterActivities } from '../../../actions/activityActions';
import ViewByDate from '../../ui/ViewByDate';
import moment from 'moment';

const propTypes = {
    auth: PropTypes.object.isRequired
};

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activitiesStartDate: new Date()
        };
    }

    getDateRangeText(startDate) {
        const endDate = new Date(startDate.getTime() + 1 * 86400000);
        return moment(startDate).format('YYYY-MM-DD') + ',' + moment(endDate).format('YYYY-MM-DD');
    }

    componentDidMount() {
        this.props.getActivities({ dateRange: this.getDateRangeText(this.state.activitiesStartDate) });
    }

    requestDate = date => {
        this.setState({ activitiesStartDate: date });
        this.props.getActivities({ dateRange: this.getDateRangeText(date) });
    };

    render() {
        const { admin } = this.props.auth;

        return (
            <div className="dashboard-container">
                <h2>Hey there, </h2>
                <h1>{admin.firstName + ' ' + admin.lastName}.</h1>
                <div className="panel dashboard-panel">
                    <h1 className="panel-title">View</h1>
                    <Link to="/admins" className="button primary medium">
                        Admins
                    </Link>
                    <span> </span>
                    <Link to="/volunteers" className="button primary medium">
                        Volunteers
                    </Link>
                    <span> </span>
                    <Link to="/members" className="button primary medium">
                        Members
                    </Link>
                    <span> </span>
                    <Link to="/activities" className="button primary medium">
                        Activities
                    </Link>
                </div>
                <div className="panel dashboard-panel">
                    <h1 className="panel-title">Register New</h1>
                    <Link to="/register" className="button primary medium">
                        Admin
                    </Link>
                    <span> </span>
                    <Link to="/activities/add" className="button primary medium">
                        Activity
                    </Link>
                </div>
                <h2>Activities</h2>
                <ViewByDate
                    requestDate={this.requestDate}
                    loading={this.props.activitiesLoading}
                    dateData={{
                        date: this.state.activitiesStartDate,
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
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getActivities: date => dispatch(filterActivities(date))
    };
};

Dashboard.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

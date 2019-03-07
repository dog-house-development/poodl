import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { filterActivities } from '../../../actions/activityActions';
import ViewByDate from '../../ui/ViewByDate';

const propTypes = {
    auth: PropTypes.object.isRequired
};

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activitiesDate: Date.now()
        };
    }

    componentDidMount() {
        // this.props.getActivities({ date: this.state.activitiesDate });
        this.props.getActivities({ date: 'Saturday' });
    }

    requestDate = date => {
        console.log(moment(date).format('MMM Do, YYYY'));
        this.setState({ activitiesDate: date });
        // this.props.getActivities(date);
        this.props.getActivities({ date: 'Saturday' });
    };

    render() {
        const { admin } = this.props.auth;

        return (
            <div className="dashboard-container">
                <h2>Hey there, </h2>
                <h1>{admin.firstName + ' ' + admin.lastName}.</h1>
                <div className="panel">
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
                </div>
                <div className="panel">
                    <h1 className="panel-title">Register New</h1>
                    <Link to="/register" className="button primary medium">
                        Admin
                    </Link>
                </div>
                <h2>Activities</h2>
                <ViewByDate
                    requestDate={this.requestDate}
                    loading={this.props.activitiesLoading}
                    dateData={{
                        date: this.state.activitiesDate,
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

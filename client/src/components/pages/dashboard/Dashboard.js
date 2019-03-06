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
        console.log(this.props.activitiesLoading ? 'Loading' : 'Loaded');
    };

    render() {
        const { admin } = this.props.auth;

        return (
            <div className="dashboard-container">
                <h2>Hey there, </h2>
                <h1>{admin.firstName + ' ' + admin.lastName}.</h1>
                <div className="panel">
                    <h1 className="panel-title">View All</h1>
                    <Link to="/admins" className="link primary">
                        Admins
                    </Link>
                    <br />
                    <Link to="/volunteers" className="link primary">
                        Volunteers
                    </Link>
                    <br />
                    <Link to="/members" className="link primary">
                        Members
                    </Link>
                </div>
                <div className="panel">
                    <h1 className="panel-title">Register New</h1>
                    <Link to="/register" className="link primary">
                        Admin
                    </Link>
                </div>
                <ViewByDate
                    requestDate={this.requestDate}
                    loading={this.props.activitiesLoading}
                    dateData={{
                        date: this.state.activitiesDate,
                        data: this.props.activities
                        // data: [
                        //     { id: '123', time: Date.now(), name: 'Bingo' },
                        //     { id: '321', time: Date.now() + 1500, name: 'Lunch' }
                        // ]
                    }}
                    errors={this.props.errors}
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    console.log(state.activities.all);
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

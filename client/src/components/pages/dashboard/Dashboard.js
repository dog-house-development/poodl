import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ViewActivitiesByDate from '../activities/ViewActivitiesByDate';

const propTypes = {
    auth: PropTypes.object.isRequired
};

export class Dashboard extends Component {
    render() {
        const { admin } = this.props.auth;

        return (
            <div className="dashboard-container page-container">
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
                <ViewActivitiesByDate />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth
    };
};

Dashboard.propTypes = propTypes;
export default connect(mapStateToProps)(Dashboard);

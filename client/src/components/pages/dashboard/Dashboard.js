import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const propTypes = {
    auth: PropTypes.object.isRequired
};

export class Dashboard extends Component {
    render() {
        const { admin } = this.props.auth;

        return (
            <div className="dashboard-container">
                <h2>Hey there, </h2>
                <h1>{admin.firstName + ' ' + admin.lastName}.</h1>
                <div className="panel dashboard-panel">
                    <h1 className="panel-title">View All</h1>
                    <Link to="/admins" className="link primary">
                        Admins
                    </Link>
                    <Link to="/volunteers" className="link primary">
                        Volunteers
                    </Link>
                    <Link to="/members" className="link primary">
                        Members
                    </Link>
                    <Link to="/activities" className="link primary">
                        Activities
                    </Link>
                </div>
                <div className="panel dashboard-panel">
                    <h1 className="panel-title">Register New</h1>
                    <Link to="/register" className="link primary">
                        Admin
                    </Link>
                    <Link to="/activities/add" className="link primary">
                        Activity
                    </Link>
                </div>
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

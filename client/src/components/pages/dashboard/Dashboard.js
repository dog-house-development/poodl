import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAdmin } from '../../../actions/authActions';
import Button from '../../ui/Button';

const propTypes = {
    logoutAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

export class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutAdmin();
    };

    render() {
        const { admin } = this.props.auth;

        return (
            <div className="dashboard-container">
                <h2>Hey there, </h2>
                <h1>{admin.name.split(' ')[0]}.</h1>
                <Button content="Log out" onClick={this.onLogoutClick} />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        logoutAdmin: () => dispatch(logoutAdmin())
    };
};

Dashboard.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export class Navbar extends Component {
    getHeaderMarkup() {
        if (!this.props.auth.isAuthenticated) {
            return (
                <>
                    <li className="">
                        <Link to="/">Poodl</Link>
                    </li>
                    <li className="right">
                        <Link to="/login">Log in</Link>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className="">
                        <Link to="/dashboard">Poodl</Link>
                    </li>
                    <li className="right">
                        <Link to="/dashboard">My Dashboard</Link>
                    </li>
                    <li className="right">
                        <Link to="/activities">Activities</Link>
                    </li>
                </>
            );
        }
    }
    render() {
        return (
            <div className="header">
                <ul>{this.getHeaderMarkup()}</ul>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(withRouter(Navbar));

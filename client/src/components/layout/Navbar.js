import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from '../ui/Dropdown';
import { logoutAdmin } from '../../actions/authActions';

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
                    <li className="right" style={{ marginTop: '12px' }}>
                        <Dropdown
                            size="small"
                            kind="secondary"
                            align="right"
                            buttonContent={this.props.auth.admin.firstName + ' ' + this.props.auth.admin.lastName}
                            dropdownContent={[
                                {
                                    content: 'Dashboard',
                                    onClick: () => {
                                        this.props.history.push('/dashboard');
                                    }
                                },
                                {
                                    content: 'My profile',
                                    onClick: () => {
                                        this.props.history.push(`/admin/${this.props.auth.admin.id}`);
                                    }
                                },
                                { type: 'divider' },
                                {
                                    content: 'Log out',
                                    onClick: () => {
                                        this.props.logoutAdmin();
                                    }
                                }
                            ]}
                        />
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

export const mapDispatchToProps = dispatch => {
    return {
        logoutAdmin: () => dispatch(logoutAdmin())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar));

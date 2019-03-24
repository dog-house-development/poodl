import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from '../ui/Dropdown';
import AuthActions from '../../actions/authActions';

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
                            arrow
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
                                        this.props.history.push(`/admins/${this.props.auth.admin.id}`);
                                    }
                                },
                                { type: 'divider' },
                                {
                                    content: 'Log out',
                                    onClick: () => {
                                        this.props.authActions.logoutAdmin();
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
        authActions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar));

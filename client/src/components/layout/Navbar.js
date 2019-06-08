import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from '../ui/Dropdown';
import AuthActions from '../../redux/actions/authActions';
import Button from '../ui/Button';

export class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            skinny: false,
            expanded: false
        };
    }

    updateWidth = () => {
        if (window.innerWidth < 700 && !this.state.skinny) {
            this.setState({ skinny: true });
        }

        if (window.innerWidth > 700 && this.state.skinny) {
            this.setState({ skinny: false });
        }
    };

    componentDidMount() {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    getMemberCheckinHeaderMarkup() {
        return (
            <div className="header check-in-header">
                <h1 className="check-in-title">Member check in</h1>
            </div>
        );
    }

    getUserDropDownContent() {
        return [
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
        ];
    }

    getUserDropDownMarkup() {
        return (
            <Dropdown
                size="small"
                kind="secondary"
                align="right"
                arrow
                caret
                buttonContent={this.props.auth.admin.firstName + ' ' + this.props.auth.admin.lastName}
                dropdownContent={this.getUserDropDownContent()}
            />
        );
    }

    getLoginMarkup() {
        return (
            <div className="header">
                <ul>
                    <li className="">
                        <Link to="/">Poodl</Link>
                    </li>
                    <li className="right">
                        <Link to="/login">Log in</Link>
                    </li>
                </ul>
            </div>
        );
    }

    getWideHeaderMarkup() {
        return (
            <div className="header">
                <ul>
                    <li className="">
                        <Link to="/dashboard">Poodl</Link>
                    </li>
                    <li className="right" style={{ marginTop: '0.7em' }}>
                        {this.getUserDropDownMarkup()}
                    </li>
                    <li className="right">
                        <Link to="/dashboard">My Dashboard</Link>
                    </li>
                    <li className="right">
                        <Link to="/activities">Activities</Link>
                    </li>
                    <li className="right">
                        <Link to="/member-check-in">Member check-in</Link>
                    </li>
                </ul>
            </div>
        );
    }

    handleMenuClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    getAccordion() {
        if (this.state.expanded) {
            return (
                <ul className="accordion" onClick={this.handleMenuClick}>
                    <li>
                        <Link to="/dashboard">My Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/activities">Activities</Link>
                    </li>
                    <li>
                        <Link to="/member-check-in">Member check-in</Link>
                    </li>
                    <li className="line">
                        <Button
                            id="myProfile"
                            kind="secondary"
                            size="small"
                            onClick={() => {
                                this.props.history.push(`/admins/${this.props.auth.admin.id}`);
                            }}>
                            My Profile
                        </Button>
                    </li>
                    <li>
                        <Button
                            id="logout"
                            kind="secondary"
                            size="small"
                            onClick={() => {
                                this.props.authActions.logoutAdmin();
                            }}>
                            Log out
                        </Button>
                    </li>
                </ul>
            );
        }
    }

    getSkinnyHeaderMarkup() {
        return (
            <div className="header skinny">
                <ul>
                    <li className="poodl">
                        <Link to="/dashboard">Poodl</Link>
                    </li>
                    <li className="right menu">
                        <Button kind="tertiary" size="small" onClick={this.handleMenuClick}>
                            <i className="material-icons">menu</i>
                        </Button>
                    </li>
                </ul>
                {this.getAccordion()}
            </div>
        );
    }

    render() {
        if (this.props.location.pathname === '/member-check-in') {
            return this.getMemberCheckinHeaderMarkup();
        }

        if (!this.props.auth.isAuthenticated) {
            return this.getLoginMarkup();
        }

        if (this.state.skinny) {
            return this.getSkinnyHeaderMarkup();
        }

        return this.getWideHeaderMarkup();
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Navbar)
);

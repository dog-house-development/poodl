import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAdmin } from '../../../actions/authActions';
import Button from '../../ui/Button';
import DataGrid from '../../ui/DataGrid';

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
        const columnNames = ['Sam', 'Karl', 'Peter'];
        const data = [
            { key: 'coolness', data: ['Cool', 'Weird', 'Musical'] },
            { key: 'smartness', data: ['Smart', 'Eh', 'Meh'] }
        ];

        return (
            <div className="dashboard-container">
                <h2>Hey there, </h2>
                <h1>{admin.name.split(' ')[0]}.</h1>
                <Button content="Log out" onClick={this.onLogoutClick} />
                <DataGrid columnNames={columnNames} data={data} />
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

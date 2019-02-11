import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataGrid from '../../ui/DataGrid';

export class ViewAdmins extends Component {
    render() {
        return (
            <div>
                <h1>View All Admins</h1>
                <DataGrid data={this.props.admins} loading={this.props.loading} />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    console.log(state.admins.all);
    return {
        admins: state.admins.all,
        loading: state.admins.loading,
        errors: state.errors
    };
};

export default connect(mapStateToProps)(ViewAdmins);

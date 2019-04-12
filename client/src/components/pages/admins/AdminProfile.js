import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import _ from 'lodash';

import Loading from '../../ui/Loading';
import AdminActions from '../../../actions/adminActions';
import DynamicForm from '../../ui/DynamicForm';
import adminInputs from './adminInputs';

export class AdminProfile extends Component {
    componentDidMount() {
        this.props.adminActions.get(this.props.match.params.id);
    }

    editAdmin = (modifiedInputs, onSuccess) => {
        this.props.adminActions.edit(_.get(this.props.admin, '_id'), modifiedInputs, onSuccess);
    };

    render() {
        return (
            <div className="view-all-container page-container">
                <Link to="/admins" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all admins
                </Link>
                <div>
                    <h1>
                        {this.props.loading ? <Loading /> : _.get(this.props.admin, 'firstName')}{' '}
                        {this.props.loading ? '' : _.get(this.props.admin, 'lastName')}
                    </h1>
                    <DynamicForm
                        inputs={adminInputs}
                        editValues={this.editAdmin}
                        values={this.props.admin}
                        editable={true}
                        loading={this.props.loading}
                        errors={this.props.errors}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        admin: state.admins.all[props.match.params.id],
        loading: state.admins.loading,
        errors: state.admins.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        adminActions: bindActionCreators(AdminActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProfile);

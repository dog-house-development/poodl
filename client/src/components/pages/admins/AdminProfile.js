import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import AdminActions from '../../../actions/adminActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';
import adminFields, { Categories } from './adminFields';
import EditableProfile from '../../ui/EditableProfile';

export class AdminProfile extends Component {
    render() {
        return (
            <div className="view-all-container">
                <Link to="/admins" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all admins
                </Link>
                <div>
                    <h1>
                        {this.props.loading ? <Loading /> : _.get(this.props.admin, 'firstName')}{' '}
                        {this.props.loading ? '' : _.get(this.props.admin, 'lastName')}
                    </h1>
                    <EditableProfile
                        fields={adminFields}
                        categories={Categories}
                        editProfile={this.props.adminActions.edit}
                        getProfile={this.props.adminActions.get}
                        profile={this.props.admin}
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

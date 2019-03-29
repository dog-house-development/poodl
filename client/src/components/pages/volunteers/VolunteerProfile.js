import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import VolunteerActions from '../../../actions/volunteerActions';
import Loading from '../../ui/Loading';
import { Link } from 'react-router-dom';
import volunteerFields, { Categories } from './volunteerFields';
import EditableProfile from '../../ui/EditableProfile';

export class VolunteerProfile extends Component {
    render() {
        return (
            <div className="view-all-container">
                <Link to="/volunteers" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all volunteers
                </Link>
                <div>
                    <h1>
                        {this.props.loading ? <Loading /> : _.get(this.props.volunteers, 'firstName')}{' '}
                        {this.props.loading ? '' : _.get(this.props.volunteers, 'lastName')}
                    </h1>
                    <EditableProfile
                        fields={volunteerFields}
                        categories={Categories}
                        editProfile={this.props.volunteerActions.edit}
                        getProfile={this.props.volunteerActions.get}
                        profile={this.props.volunteer}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        volunteer: state.volunteers.all[props.match.params.id],
        loading: state.volunteers.loading,
        errors: state.volunteers.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        volunteerActions: bindActionCreators(VolunteerActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VolunteerProfile);

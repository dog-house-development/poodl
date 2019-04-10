import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import VolunteerActions from '../../../actions/volunteerActions';
import { Link } from 'react-router-dom';
import DynamicForm from '../../ui/DynamicForm';
import volunteerInputs from './volunteerInputs';

export class VolunteerProfile extends Component {
    static defaultProps = {
        errors: {}
    };

    componentDidMount() {
        // call redux action to retrieve specified profile from api
        this.props.volunteerActions.get(this.props.match.params.id);
    }

    editVolunteer = (modifiedInputs, onSuccess) => {
        this.props.volunteerActions.edit(_.get(this.props.volunteer, '_id'), modifiedInputs, onSuccess);
    };

    render() {
        return (
            <div className="view-all-container page-container">
                <Link to="/volunteers" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all volunteers
                </Link>
                <div>
                    <h1>
                        {_.get(this.props.volunteer, 'firstName')} {_.get(this.props.volunteer, 'lastName')}
                    </h1>

                    <DynamicForm
                        inputs={volunteerInputs}
                        editValues={this.editVolunteer}
                        values={this.props.volunteer}
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

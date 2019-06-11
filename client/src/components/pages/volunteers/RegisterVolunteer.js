import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicForm from '../../ui/DynamicForm';
import volunteerInputs from './volunteerInputs';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import VolunteerActions from '../../../redux/actions/volunteerActions';

export class RegisterVolunteer extends Component {
    static propTypes = {
        errors: PropTypes.object
    };

    static defaultProps = {
        errors: {}
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = () => {
        const volunteer = {
            ...this.state
        };

        this.props.volunteerActions.create(volunteer, this.props.history);
    };

    render() {
        return (
            <div className="register-container page-container">
                <Link to="/volunteers" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to all volunteers
                </Link>
                <div className="panel">
                    <h1 className="panel-title">Register Volunteer</h1>
                    <DynamicForm
                        inputs={volunteerInputs}
                        onChange={this.handleChange}
                        onSubmit={this.onSubmit}
                        submitButtonLabel="Register Volunteer"
                        errors={this.props.errors}
                        values={this.state}
                        errorDescription="There are errors in this form."
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        errors: state.volunteers.errors,
        loading: state.volunteers.loading
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
)(RegisterVolunteer);

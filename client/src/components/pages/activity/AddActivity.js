import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addActivity } from '../../../actions/activityActions';
import _ from 'lodash';

import Form from '../../ui/Form';

const propTypes = {
    registerActivity: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export class AddActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            time: '',
            duration: '',
            date: '',
            seniorCenter: props.adminSeniorCenter,
            errors: {},
            maxCapacity: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newActivity = {
            ...this.state
        };

        this.props.registerActivity(newActivity, this.props.history);
    };

    getFields = () => {
        const { errors } = this.state;
        const fields = [
            {
                onChange: this.onChange,
                error: errors.name,
                id: 'name',
                type: 'text',
                label: 'Activity Name',
                placeholder: 'Name of Activity',
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.time,
                id: 'time',
                type: 'text',
                label: 'Time of Activity',
                placeholder: 'Time of Activity',
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.Duration,
                id: 'duration',
                type: 'text',
                label: 'duration',
                placeholder: 'Duration of Activity',
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.firstName,
                id: 'date',
                type: 'text',
                label: 'Activity Date',
                placeholder: 'Activity date',
                autocomplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.maxCapacity,
                id: 'maxCapacity',
                type: 'text',
                label: 'Maximum Capacity',
                placeholder: 'Capacity',
                autocomplete: 'off'
            }
        ];

        return fields;
    };

    render() {
        return (
            <div className="register-container">
                <Link to="/dashboard" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to home
                </Link>
                <Form
                    noValidate
                    fields={this.getFields()}
                    onSubmit={this.onSubmit}
                    buttonLabel="Add Activity"
                    formTitle="Add Activity"
                />
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        adminIsSuper: _.get(state.auth.admin, 'superAdmin', false),
        adminSeniorCenter: _.get(state.auth.admin, 'seniorCenter'),
        errors: state.errors
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        registerActivity: (activityData, history) => dispatch(addActivity(activityData, history))
    };
};

AddActivity.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddActivity));

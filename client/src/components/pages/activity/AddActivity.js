import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            seniorCenter: props.adminSeniorCenter,
            errors: {}
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
                label: 'Name',
                placeholder: 'Name',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.description,
                id: 'description',
                type: 'text',
                label: 'Description',
                placeholder: 'Description',
                autoComplete: 'off'
            },
            {
                onChange: this.onChange,
                error: errors.startDate,
                id: 'startDate',
                type: 'datetime-local',
                label: 'Start date',
                sidebyside: 1
            },
            {
                onChange: this.onChange,
                error: errors.endDate,
                id: 'endDate',
                type: 'datetime-local',
                label: 'End Date',
                sidebyside: 2
            }
        ];

        return fields;
    };

    render() {
        return (
            <div className="activity-container">
                <Link to="/activities" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all activities
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
)(AddActivity);

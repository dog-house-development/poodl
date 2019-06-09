import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActivityActions from '../../../actions/activityActions';
import _ from 'lodash';
import moment from 'moment';
import DynamicForm from '../../ui/DynamicForm';
import activityInputs from './activityInputs';

const propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export class AddActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().startOf('day'),
            name: '',
            description: '',
            startTime: moment(moment().get('hours'), 'h')
        };

        this.state.endTime = this.state.startTime.clone().add(1, 'hour');
    }

    componentDidMount() {
        this.props.activityActions.filter();
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const startTimeDuration = moment.duration(this.state.startTime.diff(moment().startOf('day')));
        const endTimeDuration = moment.duration(this.state.endTime.diff(moment().startOf('day')));
        const start = this.state.date.clone().add(startTimeDuration);
        const end = this.state.date.clone().add(endTimeDuration);

        const newActivity = {
            ...this.state,
            startDate: start.toISOString(),
            endDate: end.toISOString()
        };

        this.props.activityActions.create(newActivity, this.props.history);
    };

    getErrors() {
        const errors = this.props.errors;
        if (errors.startDate) {
            errors.startTime = 'Start time must be before end time';
        }

        return errors;
    }

    getFormData() {
        return {
            name: this.props.activities
        };
    }

    render() {
        return (
            <div className="add-activity-container page-container">
                <Link to="/activities" className="button small tertiary icon">
                    <i className="material-icons button-icon">keyboard_backspace</i> Back to all activities
                </Link>
                <div className="add-activity-panel panel">
                    <h1 className="panel-title">Add Activity</h1>
                    <DynamicForm
                        inputs={activityInputs}
                        onChange={this.handleChange}
                        onSubmit={this.onSubmit}
                        submitButtonLabel="Add Activity"
                        errors={this.getErrors()}
                        values={this.state}
                        loading={this.props.loading}
                        errorDescription=""
                        data={this.getFormData()}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        errors: state.activities.errors,
        loading: state.activities.loading,
        activities: _.get(state.activities, 'all')
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        activityActions: bindActionCreators(ActivityActions, dispatch)
    };
};

AddActivity.propTypes = propTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddActivity);

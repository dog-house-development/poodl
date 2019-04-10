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

export class ViewActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.activityActions.get(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            this.setState(this.getStateFromProps());
        }
    }

    getStateFromProps() {
        if (this.props.activity) {
            const startTime = moment(moment(this.props.activity.startDate).format('h:mm a'), 'h:mm a');
            const endTime = moment(moment(this.props.activity.endDate).format('h:mm a'), 'h:mm a');

            return {
                date: moment(this.props.activity.startDate).startOf('day'),
                name: this.props.activity.name,
                description: this.props.activity.description,
                startTime: startTime,
                endTime: endTime
            };
        }
    }

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

    editActivity = (modifiedInputs, onSuccess) => {
        const date = modifiedInputs.date || this.state.date;
        const startTime = modifiedInputs.startTime || this.state.startTime;
        const endTime = modifiedInputs.endTime || this.state.endTime;

        const startTimeDuration = moment.duration(startTime.diff(moment().startOf('day')));
        const start = date.clone().add(startTimeDuration);
        modifiedInputs.startDate = start.toISOString();

        const endTimeDuration = moment.duration(endTime.diff(moment().startOf('day')));
        const end = date.clone().add(endTimeDuration);
        modifiedInputs.endDate = end.toISOString();

        this.props.activityActions.edit(_.get(this.props.activity, '_id'), modifiedInputs, onSuccess);
    };

    render() {
        return (
            <div className="page-container">
                <Link to="/activities" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all activities
                </Link>
                <div>
                    <h1>{_.get(this.props.activity, 'name')}</h1>
                    <DynamicForm
                        inputs={activityInputs}
                        editValues={this.editActivity}
                        errors={this.getErrors()}
                        values={this.state}
                        loading={this.props.loading}
                        data={this.getFormData()}
                        editable={true}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.activities.errors,
        loading: state.activities.loading,
        activities: _.get(state.activities, 'all'),
        activity: state.activities.all[props.match.params.id]
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        activityActions: bindActionCreators(ActivityActions, dispatch)
    };
};

ViewActivity.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewActivity);

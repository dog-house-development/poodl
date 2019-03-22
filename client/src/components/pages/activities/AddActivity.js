import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActivityActions from '../../../actions/activityActions';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from '../../ui/DatePicker';
import TimePicker from '../../ui/TimePicker';
import Field from '../../ui/Field';
import Button from '../../ui/Button';

import Form from '../../ui/Form';

const propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export class AddActivity extends Component {
    constructor(props) {
        super(props);
        const today = moment();
        this.state = {
            seniorCenterId: props.adminSeniorCenterId,
            errors: {},
            multiDay: false,
            startDate: moment().startOf('day'),
            endDate: moment()
                .startOf('day')
                .add(1, 'day'),
            startTime: moment(moment().get('hours'), 'h')
        };

        this.state.endTime = this.state.startTime.clone().add(1, 'hour');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onPickerChange = (name, date) => {
        this.setState({ [name]: date });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const startTimeDuration = moment.duration(this.state.startTime.diff(moment().startOf('day')));
        const endTimeDuration = moment.duration(this.state.endTime.diff(moment().startOf('day')));
        const start = this.state.startDate.clone().add(startTimeDuration);
        let end = this.state.startDate.clone().add(endTimeDuration);

        if (this.state.multiDay) {
            end = this.state.endDate.clone().add(endTimeDuration);
        }

        const newActivity = {
            ...this.state,
            startDate: start.toISOString(),
            endDate: end.toISOString()
        };

        this.props.activityActions.create(newActivity, this.props.history);
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
            }
        ];

        return fields;
    };

    getFieldsMarkup() {
        return _.map(this.getFields(), field => <Field key={field.id} {...field} />);
    }

    getErrorMarkup() {
        if (this.state.errors.startDate) {
            return <div className="form-error">{this.state.errors.startDate}</div>;
        }
    }

    getDateErrorMarkup() {
        if (this.state.errors.startDate) {
            if (this.state.multiDay) {
                return this.state.errors.startDate;
            }

            return 'Start time must be before end time';
        }
    }

    toggleMultiDay = () => {
        this.setState(state => {
            return { multiDay: !state.multiDay };
        });
    };

    getEndDateMarkup() {
        if (this.state.multiDay) {
            return (
                <DatePicker title="End Date" name="endDate" date={this.state.endDate} onChange={this.onPickerChange} />
            );
        }
    }

    getDatePickersMarkup() {
        return (
            <>
                <div className="side-by-side">
                    <DatePicker
                        title={this.state.multiDay ? 'Start Date' : 'Date'}
                        name="startDate"
                        date={this.state.startDate}
                        onChange={this.onPickerChange}
                        error={this.state.multiDay ? this.getDateErrorMarkup() : ''}
                    />
                    {this.getEndDateMarkup()}
                </div>
                <Button
                    type="button"
                    size="small"
                    kind="secondary"
                    content={this.state.multiDay ? 'One Day' : 'Multiple Days'}
                    onClick={this.toggleMultiDay}
                    title={
                        this.state.multiDay
                            ? 'The activity occurs during a single day'
                            : 'The activity spans multiple days'
                    }
                />
            </>
        );
    }

    render() {
        return (
            <div className="activity-container">
                <Link to="/activities" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all activities
                </Link>
                <div className="panel">
                    <h1 className="panel-title">Add Activity</h1>
                    <form noValidate onSubmit={this.onSubmit}>
                        {this.getFieldsMarkup()}
                        <div className="side-by-side">
                            <TimePicker
                                title="Start Time"
                                name="startTime"
                                time={this.state.startTime}
                                onChange={this.onPickerChange}
                                error={this.state.multiDay ? '' : this.getDateErrorMarkup()}
                            />
                            <TimePicker
                                title="End Time"
                                name="endTime"
                                time={this.state.endTime}
                                onChange={this.onPickerChange}
                            />
                        </div>
                        {this.getDatePickersMarkup()}
                        <Button type="submit" content="Add Activity" formButton />
                    </form>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        adminIsSuper: _.get(state.auth.admin, 'superAdmin', false),
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
        errors: state.activities.errors
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

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
import ComboBox from '../../ui/ComboBox';
import DynamicForm from '../../ui/DynamicForm';
import activityInputs from './activityInputs';

const propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export class AddActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seniorCenterId: props.adminSeniorCenterId,
            multiDay: false,
            startDate: moment().startOf('day'),
            date: moment().startOf('day'),
            endDate: moment()
                .startOf('day')
                .add(1, 'day'),
            name: '',
            description: '',
            startTime: moment(moment().get('hours'), 'h')
        };

        this.state.endTime = this.state.startTime.clone().add(1, 'hour');
    }

    componentDidMount() {
        this.props.activityActions.filter();
    }

    onValueChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleChange = e => {
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
        const fields = [
            {
                onChange: this.handleChange,
                error: this.props.errors.description,
                id: 'description',
                type: 'text',
                label: 'Description',
                placeholder: 'Description'
            }
        ];

        return fields;
    };

    getFieldsMarkup() {
        return _.map(this.getFields(), field => <Field key={field.id} {...field} />);
    }

    getDateErrorMarkup() {
        if (this.props.errors.startDate) {
            if (this.state.multiDay) {
                return this.props.errors.startDate;
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
            return <DatePicker label="End Date" id="endDate" date={this.state.endDate} onChange={this.handleChange} />;
        }
    }

    getDatePickersMarkup() {
        return (
            <>
                <div className="side-by-side">
                    <DatePicker
                        label={this.state.multiDay ? 'Start Date' : 'Date'}
                        id="startDate"
                        value={this.state.startDate}
                        onChange={this.handleChange}
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

    getFormMarkup() {
        return (
            <form noValidate onSubmit={this.onSubmit}>
                <ComboBox
                    data={this.props.activities}
                    label="Name"
                    placeholder="Name"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    error={this.props.errors.name}
                />
                {this.getFieldsMarkup()}
                <div className="side-by-side">
                    <TimePicker
                        label="Start Time"
                        id="startTime"
                        value={this.state.startTime}
                        onChange={this.handleChange}
                        error={this.state.multiDay ? '' : this.getDateErrorMarkup()}
                    />
                    <TimePicker label="End Time" id="endTime" value={this.state.endTime} onChange={this.handleChange} />
                </div>
                {this.getDatePickersMarkup()}
                <Button type="submit" content="Add Activity" formButton />
            </form>
        );
    }
    getFormData() {
        return {
            name: this.props.activities
        };
    }
    render() {
        return (
            <div className="add-activity-container">
                <Link to="/activities" className="button small tertiary">
                    <i className="material-icons">keyboard_backspace</i> Back to all activities
                </Link>
                <div className="add-activity-panel panel">
                    <h1 className="panel-title">Add Activity</h1>
                    {/* {this.getFormMarkup()} */}
                    <DynamicForm
                        inputs={activityInputs}
                        onChange={this.handleChange}
                        onSubmit={this.onSubmit}
                        submitButtonLabel="Add Activity"
                        errors={this.props.errors}
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

export const mapStateToProps = (state, props) => {
    return {
        auth: state.auth,
        adminIsSuper: _.get(state.auth.admin, 'superAdmin', false),
        adminSeniorCenterId: _.get(state.auth.admin, 'seniorCenterId'),
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

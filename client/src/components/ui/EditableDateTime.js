import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Button from './Button';

const propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    value: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    label: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
    dayLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    yearLabel: PropTypes.string,
    monthLabel: PropTypes.string,
    minYear: PropTypes.number,
    maxYear: PropTypes.number
};

export class EditableDateTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seniorCenterId: props.adminSeniorCenterId,
            multiDay: false,

            startTime: moment(moment().get('hours'), 'h')
        };

        this.state.endTime = this.state.startTime.clone().add(1, 'hour');
    }

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
    };

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
                        date={this.state.startDate}
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

    getDateMarkup() {
        const multiday = this.state.multiDay;

        if (this.props.multiDay == true) {
            return <div>IS MULTI DAY</div>;
        }
        return (
            <>
                <div>IS NOT MULTI DAY</div>;
            </>
        );
    }
    render() {
        if (this.props.editMode) {
            return (
                <div className="side-by-side">
                    <TimePicker
                        label="Start Time"
                        id="startTime"
                        time={this.state.startTime}
                        onChange={this.handleChange}
                        error={this.state.multiDay ? '' : this.getDateErrorMarkup()}
                    />
                    <TimePicker label="End Time" id="endTime" time={this.state.endTime} onChange={this.handleChange} />
                    {this.getDatePickersMarkup()}
                </div>
            );
        } else if (!this.props.multiDay && !this.props.editMode) {
            return <div>IS MULTI DAY</div>;
        }

        return <div>{this.getDateDisplay()}</div>;
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

EditableDateTime.propTypes = propTypes;
export default connect(mapStateToProps)(EditableDateTime);

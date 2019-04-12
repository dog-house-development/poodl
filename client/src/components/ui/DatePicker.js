import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from './Select';
import assert from 'assert';
import _ from 'lodash';

class DatePicker extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        id: PropTypes.string.isRequired,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        label: PropTypes.string.isRequired,
        dayLabel: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        yearLabel: PropTypes.string,
        monthLabel: PropTypes.string,
        minYear: PropTypes.number,
        maxYear: PropTypes.number,
        present: PropTypes.bool
    };

    static defaultProps = {
        dayLabel: '',
        yearLabel: '',
        monthLabel: ''
    };

    constructor(props) {
        super(props);

        if (this.props.value) {
            this.state = this.getStateFromValue();
        } else {
            this.state = {
                day: 'Day',
                month: 'Month',
                year: 'Year'
            };
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.value, this.props.value)) {
            this.setState(this.getStateFromValue());
        }

        if (!_.isEqual(prevState, this.state) && this.isDatePicked()) {
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.currentDate()
                }
            });
        }
    }

    getStateFromValue() {
        const value = moment(this.props.value);

        return {
            day: value.format('D'),
            month: value.format('MMMM'),
            year: value.format('YYYY')
        };
    }

    isDatePicked() {
        return this.state.day !== 'Day' && this.state.month !== 'Month' && this.state.year !== 'Year';
    }

    currentDate() {
        const { day, month, year } = this.state;
        const date = moment(`${day}-${month}-${year}`, 'D-MMMM-YYYY');
        if (date.isValid()) {
            return date;
        }

        // If the date isn't valid then the day is overflowed so we use
        // the end of the month
        return moment(`${month}-${year}`, 'MMMM-YYYY').endOf('month');
    }

    onChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    daysInMonth() {
        // Use 2000 if the year isn't set, because it's a leap year
        // that way people can pick February 29th before they pick
        // the year.
        const year = this.state.year === 'Year' ? 2000 : this.state.year;
        const month = this.state.month;
        const time = `${month}-${year}`;
        return moment(time, 'MMMM-YYYY').daysInMonth();
    }

    getDayDropdown() {
        let days = [];
        let disabled = true;
        if (this.state.month !== 'Month') {
            disabled = false;
            days = Array.from(Array(this.daysInMonth()), (_x, index) => index + 1);
        }

        return (
            <Select
                disabled={disabled}
                label={this.props.dayLabel}
                name="day"
                value={this.state.day}
                onChange={this.onChange}
                options={days}
                width="medium"
                placeholder="Day"
                noCaret
            />
        );
    }

    getMonthDropdown() {
        let months = moment.months();
        return (
            <Select
                label={this.props.monthLabel}
                name="month"
                value={this.state.month}
                onChange={this.onChange}
                options={months}
                error={this.props.error}
                placeholder="Month"
                noCaret
            />
        );
    }

    getYearDropdown() {
        let years;
        const { minYear, maxYear } = this.props;
        if (minYear && maxYear) {
            assert(maxYear > minYear, 'Max year must be more than min year');
            years = Array.from(Array(maxYear - minYear), (_, index) => index + minYear);
        } else {
            const yearOffset = moment().year() - 5;
            years = Array.from(Array(10), (_, index) => index + yearOffset);
        }

        return (
            <Select
                label={this.props.yearLabel}
                name="year"
                value={this.state.year}
                onChange={this.onChange}
                options={years}
                placeholder="Year"
                noCaret
            />
        );
    }

    render() {
        if (this.props.present) {
            return (
                <div className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <p>{this.props.value ? this.currentDate().format('MMMM Do, YYYY') : ''}</p>
                </div>
            );
        }

        return (
            <div className="picker field-wrapper">
                <p className="picker-label field-label">{this.props.label}</p>
                {this.getMonthDropdown()}
                {this.getDayDropdown()}
                {this.getYearDropdown()}
            </div>
        );
    }
}

export default DatePicker;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from './Select';
import assert from 'assert';
class DatePicker extends Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        label: PropTypes.string.isRequired,
        dayLabel: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        yearLabel: PropTypes.string,
        monthLabel: PropTypes.string,
        minYear: PropTypes.number,
        maxYear: PropTypes.number
    };

    static defaultProps = {
        value: moment().startOf('day'),
        dayLabel: '',
        yearLabel: '',
        monthLabel: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            day: this.props.value.format('DD'),
            month: this.props.value.format('MMMM'),
            year: this.props.value.format('YYYY')
        };

        // Make sure the parent has the correct value
        this.props.onChange({
            target: {
                id: this.props.id,
                value: this.currentDate()
            }
        });
    }

    componentDidUpdate(_, prevState) {
        if (prevState !== this.state) {
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.currentDate()
                }
            });
        }
    }

    currentDate() {
        const { day, month, year } = this.state;
        return moment(`${day}-${month}-${year}`, 'DD-MMMM-YYYY');
    }

    onChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    getDayDropdown() {
        const days = Array.from(Array(this.currentDate().daysInMonth()), (_x, index) => index + 1);
        return (
            <Select
                label={this.props.dayLabel}
                name="day"
                value={this.state.day}
                onChange={this.onChange}
                options={days}
                width="medium"
            />
        );
    }

    getMonthDropdown() {
        const months = moment.months();
        return (
            <Select
                label={this.props.monthLabel}
                name="month"
                value={this.state.month}
                onChange={this.onChange}
                options={months}
                error={this.props.error}
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
            />
        );
    }

    render() {
        return (
            <div className="picker">
                <p className="picker-label field-label">{this.props.label}</p>
                {this.getMonthDropdown()}
                {this.getDayDropdown()}
                {this.getYearDropdown()}
            </div>
        );
    }
}

export default DatePicker;

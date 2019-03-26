import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from './Select';

class DatePicker extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        date: PropTypes.object.isRequired,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };

    static defaultProps = {
        dayLabel: '',
        monthLabel: '',
        yearLabel: '',
        date: moment().startOf('day')
    };

    constructor(props) {
        super(props);
        this.state = {
            day: this.props.date.format('DD'),
            month: this.props.date.format('MMMM'),
            year: this.props.date.format('YYYY')
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onChange(this.props.name, this.currentDate());
        }
    }

    currentDate() {
        const { day, month, year } = this.state;
        return moment(`${day}-${month}-${year}`, 'DD-MMMM-YYYY');
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };

    getDayDropdown() {
        const days = Array.from(Array(this.currentDate().daysInMonth()), (x, index) => index + 1);
        return (
            <Select
                label={this.props.dayLabel}
                name="day"
                value={this.state.day}
                onChange={this.onChange}
                options={days}
                width="medium-width\"
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
        const yearOffset = moment().year() - 5;
        const years = Array.from(Array(10), (x, index) => index + yearOffset);
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
                <p className="picker-title field-label">{this.props.title}</p>
                {this.getMonthDropdown()}
                {this.getDayDropdown()}
                {this.getYearDropdown()}
            </div>
        );
    }
}

export default DatePicker;

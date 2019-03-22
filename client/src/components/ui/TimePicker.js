import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import Select from './Select';

class TimePicker extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        time: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        title: PropTypes.string.isRequired
    };

    static defaultProps = {
        hourLabel: '',
        minuteLabel: '',
        ampmLabel: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            hour: this.props.time.format('h'),
            minute: '0',
            ampm: this.props.time.format('A')
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onChange(this.props.name, this.currentTime());
        }
    }

    currentTime() {
        const { hour, minute, ampm } = this.state;
        return moment(`${hour}:${minute} ${ampm}`, 'hh:mm A');
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };

    getHourDropdown() {
        const hours = Array.from(Array(12), (x, index) => index + 1);
        return (
            <Select
                label={this.props.hourLabel}
                name="hour"
                value={this.state.hour}
                onChange={this.onChange}
                options={hours}
                error={this.props.error}
            />
        );
    }

    getMinuteDropdown() {
        const minutes = Array.from(Array(60), (x, index) => index);
        return (
            <Select
                label={this.props.minuteLabel}
                name="minute"
                value={this.state.minute}
                onChange={this.onChange}
                options={minutes}
                padStart={2}
                width="medium-width"
            />
        );
    }

    getAMPMDropdown() {
        const ampms = ['AM', 'PM'];
        return (
            <Select
                label={this.props.ampmLabel}
                name="ampm"
                value={this.state.ampm}
                onChange={this.onChange}
                options={ampms}
            />
        );
    }

    render() {
        return (
            <div className="picker">
                <p className="picker-title field-label">{this.props.title}</p>
                {this.getHourDropdown()} : {this.getMinuteDropdown()}
                {this.getAMPMDropdown()}
            </div>
        );
    }
}

export default TimePicker;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from './Select';

class TimePicker extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        label: PropTypes.string.isRequired
    };

    static defaultProps = {
        hourLabel: '',
        minuteLabel: '',
        ampmLabel: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            hour: this.props.value.format('h'),
            minute: '0',
            ampm: this.props.value.format('A')
        };
    }

    componentDidUpdate(_, prevState) {
        if (prevState !== this.state) {
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.currentTime()
                }
            });
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
                noCaret
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
                width="medium"
                noCaret
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
                noCaret
            />
        );
    }

    render() {
        return (
            <div className="picker">
                <p className="picker-label field-label">{this.props.label}</p>
                {this.getHourDropdown()} : {this.getMinuteDropdown()}
                {this.getAMPMDropdown()}
            </div>
        );
    }
}

export default TimePicker;

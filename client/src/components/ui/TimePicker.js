import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from './Select';
import _ from 'lodash';

class TimePicker extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.object,
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
        this.state = this.getStateFromValue();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.value, this.props.value)) {
            this.setState(this.getStateFromValue());
        }

        if (prevState !== this.state) {
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.currentTime()
                }
            });
        }
    }

    getStateFromValue() {
        const value = moment(this.props.value);

        return {
            hour: value.format('h'),
            minute: value.format('mm'),
            ampm: value.format('A')
        };
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
        if (this.props.present) {
            return (
                <div className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <p>{this.props.value ? this.currentTime().format('h:mm A') : ''}</p>
                </div>
            );
        }

        return (
            <div className="picker field-wrapper">
                <p className="picker-label field-label">{this.props.label}</p>
                {this.getHourDropdown()} : {this.getMinuteDropdown()}
                {this.getAMPMDropdown()}
            </div>
        );
    }
}

export default TimePicker;

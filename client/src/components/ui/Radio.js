import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Radio extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        defaultValue: PropTypes.string,
        id: PropTypes.string.isRequired,
        options: PropTypes.array
    };

    static defaultProps = {
        selectedOption: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: props.selectedOption
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            this.props.onChange({
                target: {
                    id: this.props.id,
                    value: this.state.selectedOption
                }
            });
        }
    }
    onChange = e => {
        this.setState({ selectedOption: e.target.name });
    };

    getOptionMarkup = option => {
        return (
            <div key={option}>
                <label>
                    <input
                        type="radio"
                        name={option}
                        value={option}
                        checked={this.state.selectedOption === option}
                        onChange={this.onChange}
                    />
                    {' ' + option}
                </label>
            </div>
        );
    };

    getOptionListMarkup() {
        return _.map(this.props.options, this.getOptionMarkup);
    }

    render() {
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                {this.getOptionListMarkup()}
            </div>
        );
    }
}

export default Radio;

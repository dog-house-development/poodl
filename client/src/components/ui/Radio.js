import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Radio extends Component {
    static propTypes = {
        label: PropTypes.string,
        handleChange: PropTypes.func.isRequired,
        defaultValue: PropTypes.string,
        id: PropTypes.string.isRequired,
        options: PropTypes.array
    };

    render() {
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <form onChange={this.props.handleChange}>
                    {_.map(this.props.options, option => {
                        return (
                            <div key={option}>
                                <label>
                                    <input
                                        id={this.props.id}
                                        type="radio"
                                        name={this.props.id}
                                        value={option}
                                        defaultChecked={this.props.defaultValue === option}
                                    />
                                    {' ' + option}
                                </label>
                            </div>
                        );
                    })}
                </form>
            </div>
        );
    }
}

export default Radio;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckBox extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.bool,
        id: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="checkbox-wrapper">
                <label>
                    <input
                        type="checkbox"
                        id={this.props.id}
                        name={this.props.id}
                        checked={this.props.value}
                        onChange={this.props.onChange}
                    />
                    <p className="checkbox-label">{this.props.label}</p>
                </label>
            </div>
        );
    }
}

export default CheckBox;

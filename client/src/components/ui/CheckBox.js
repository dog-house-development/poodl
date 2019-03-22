import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditableCheckBox extends Component {
    static propTypes = {
        label: PropTypes.string,
        handleChange: PropTypes.func.isRequired,
        defaultValue: PropTypes.bool,
        id: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <input
                    type="checkbox"
                    id={this.props.id}
                    defaultChecked={this.props.defaultValue}
                    onChange={this.props.handleChange}
                />
            </div>
        );
    }
}

export default EditableCheckBox;

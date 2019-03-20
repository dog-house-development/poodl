import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.bool,
    id: PropTypes.string.isRequired
};

const defaultProps = {};

class EditableCheckBox extends Component {
    render() {
        if (this.props.editMode) {
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
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.defaultValue ? 'Yes' : 'No'}</p>
            </div>
        );
    }
}

EditableCheckBox.propTypes = propTypes;
EditableCheckBox.defaultProps = defaultProps;
export default EditableCheckBox;

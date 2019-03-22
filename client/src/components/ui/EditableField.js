import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const propTypes = {
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
    id: PropTypes.string.isRequired
};

const defaultProps = {};

class EditableField extends Component {
    render() {
        if (this.props.editMode) {
            return (
                <Field
                    onChange={this.props.handleChange}
                    id={this.props.id}
                    content={this.props.defaultValue}
                    label={this.props.label}
                />
            );
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.defaultValue}</p>
            </div>
        );
    }
}

EditableField.propTypes = propTypes;
EditableField.defaultProps = defaultProps;
export default EditableField;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const propTypes = {
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
                    value={this.props.value}
                    label={this.props.label}
                />
            );
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.value}</p>
            </div>
        );
    }
}

EditableField.propTypes = propTypes;
EditableField.defaultProps = defaultProps;
export default EditableField;

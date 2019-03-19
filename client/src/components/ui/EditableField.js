import React, { Component } from 'react';
import Field from './Field';

// make sure to do the prop types

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

export default EditableField;

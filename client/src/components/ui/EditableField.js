import React, { Component } from 'react';
import Field from './Field';

// make sure to do the prop types

class EditableField extends Component {
    render() {
        if (this.props.editMode) {
            return <Field onChange={this.props.handleChange} id={this.props.id} content={this.props.defaultValue} />;
        }
        return <p>{this.props.defaultValue}</p>;
    }
}

export default EditableField;

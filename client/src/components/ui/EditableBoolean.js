import React, { Component } from 'react';

// make sure to do the prop types

class EditableBoolean extends Component {
    render() {
        if (this.props.editMode) {
            return (
                <div className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <form onChange={this.props.handleChange}>
                        <input type="radio" name="name" value={true} checked /> {this.props.optionValues[0]}
                        <br />
                        <input type="radio" name="name" value={false} /> {this.props.optionValues[1]}
                        <br />
                    </form>
                </div>
            );
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.id ? this.props.optionValues[0] : this.props.optionValues[1]}</p>
            </div>
        );
    }
}

export default EditableBoolean;

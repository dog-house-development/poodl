import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';

class EditableRadio extends Component {
    static propTypes = {
        label: PropTypes.string,
        handleChange: PropTypes.func.isRequired,
        defaultValue: PropTypes.string,
        id: PropTypes.string.isRequired,
        options: PropTypes.array
    };

    render() {
        if (this.props.editMode) {
            return <Radio {...this.props} />;
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.defaultValue}</p>
            </div>
        );
    }
}

export default EditableRadio;

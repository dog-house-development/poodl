import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';

class EditableRadio extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
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
                <p>{this.props.value}</p>
            </div>
        );
    }
}

export default EditableRadio;

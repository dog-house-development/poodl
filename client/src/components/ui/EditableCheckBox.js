import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './CheckBox';

class EditableCheckBox extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        defaultValue: PropTypes.bool,
        id: PropTypes.string.isRequired
    };

    render() {
        if (this.props.editMode) {
            return <Checkbox {...this.props} />;
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.defaultValue ? 'Yes' : 'No'}</p>
            </div>
        );
    }
}

export default EditableCheckBox;

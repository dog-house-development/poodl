import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiCheckbox from './MultiCheckbox';
import _ from 'lodash';

class EditableMultiCheckBox extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.array,
        id: PropTypes.string.isRequired,
        options: PropTypes.array
    };

    render() {
        if (this.props.editMode) {
            return <MultiCheckbox {...this.props} />;
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{_.join(this.props.value, ', ')}</p>
            </div>
        );
    }
}

export default EditableMultiCheckBox;

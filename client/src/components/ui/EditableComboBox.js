import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComboBox from './ComboBox';

class EditableComboBox extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        error: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    };

    render() {
        if (this.props.editMode) {
            return <ComboBox {...this.props} />;
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.value}</p>
            </div>
        );
    }
}

export default EditableComboBox;

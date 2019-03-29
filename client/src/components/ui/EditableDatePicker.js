import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    date: PropTypes.object.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    id: PropTypes.string.isRequired
};

const defaultProps = {};

class EditableDatePicker extends Component {
    render() {
        if (this.props.editMode) {
            return <DatePicker {...this.props} />;
        }
        return (
            <div className="field-wrapper editable-field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p>{this.props.defaultValue}</p>
            </div>
        );
    }
}

EditableDatePicker.propTypes = propTypes;
EditableDatePicker.defaultProps = defaultProps;
export default EditableDatePicker;

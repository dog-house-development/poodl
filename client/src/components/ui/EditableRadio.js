import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const propTypes = {
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
    id: PropTypes.string.isRequired,
    options: PropTypes.array
};

const defaultProps = {};

class EditableRadio extends Component {
    render() {
        if (this.props.editMode) {
            return (
                <div className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <form onChange={this.props.handleChange}>
                        {_.map(this.props.options, option => {
                            return (
                                <div key={option}>
                                    <input
                                        id={this.props.id}
                                        type="radio"
                                        name={this.props.id}
                                        value={option}
                                        defaultChecked={this.props.defaultValue === option}
                                    />
                                    {' ' + option}
                                </div>
                            );
                        })}
                    </form>
                </div>
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

EditableRadio.propTypes = propTypes;
EditableRadio.defaultProps = defaultProps;
export default EditableRadio;

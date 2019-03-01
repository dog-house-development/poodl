import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.oneOf(['normal', 'large']),
    content: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const defaultProps = {
    size: 'normal',
    type: 'text'
};

class Field extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.props.onChange(e);
    }

    render() {
        return (
            <div className="field-wrapper">
                <p className="field-label">{this.props.label}</p>
                <p className="field-error-label">{this.props.error}</p>
                <div className="field-outer">
                    <input
                        id={this.props.id}
                        type={this.props.type}
                        name={this.props.name}
                        defaultValue={this.props.content}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}
                        className={`field ${this.props.size} ${this.props.error ? 'field-error-border' : ''}`}
                        error={this.props.error}
                    />
                </div>
            </div>
        );
    }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
export default Field;

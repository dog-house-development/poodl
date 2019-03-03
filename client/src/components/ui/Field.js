import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.oneOf(['normal', 'large']),
    content: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    autocomplete: PropTypes.oneOf(['on', 'off']),
    sideBySide: PropTypes.oneOf([1, 2]),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const defaultProps = {
    size: 'normal',
    type: 'text',
    autocomplete: 'on'
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
            <div className={classnames('field-wrapper', { 'inline-field': this.props.sideBySide })}>
                <p className="field-label">{this.props.label}</p>
                <p className="field-error-label">{this.props.error}</p>
                <div className="field-outer">
                    <input
                        autoComplete={this.props.autocomplete}
                        id={this.props.id}
                        type={this.props.type}
                        name={this.props.name}
                        defaultValue={this.props.content}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}
                        className={classnames(
                            'field',
                            this.props.size,
                            { 'first-side-by-side-input': this.props.sideBySide === 1 },
                            { 'second-side-by-side-input': this.props.sideBySide === 2 },
                            { 'field-error-border': this.props.error }
                        )}
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

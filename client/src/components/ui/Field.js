import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    size: PropTypes.oneOf(['normal', 'large']),
    content: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    spellCheck: PropTypes.oneOf(['true', 'false']),
    sidebyside: PropTypes.oneOf([1, 2]),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const defaultProps = {
    size: 'normal',
    type: 'text',
    autoComplete: 'on'
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
            <div className={classnames('field-wrapper', { 'inline-field': this.props.sidebyside })}>
                <p className="field-label">{this.props.label}</p>
                <div className="field-outer">
                    <input
                        {...this.props}
                        defaultValue={this.props.content}
                        onChange={this.handleChange}
                        className={classnames(
                            'field',
                            this.props.size,
                            { 'first-side-by-side-input': this.props.sidebyside === 1 },
                            { 'second-side-by-side-input': this.props.sidebyside === 2 },
                            { 'field-error-border': this.props.error }
                        )}
                        value={this.props.value}
                    />
                    <p className="field-error-label">{this.props.error}</p>
                </div>
            </div>
        );
    }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
export default Field;

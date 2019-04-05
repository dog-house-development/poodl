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
    kind: PropTypes.oneOf(['primary', 'secondary']),
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    autoFocus: PropTypes.oneOf(['on', 'off']),
    spellCheck: PropTypes.oneOf(['true', 'false']),
    sidebyside: PropTypes.oneOf([1, 2]),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func
};

const defaultProps = {
    size: 'normal',
    type: 'text',
    autoComplete: 'on',
    kind: 'primary'
    // value is not default to '' because I want the warning
    // if no value prop is given
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
            <div
                className={classnames('field-wrapper', this.props.className, {
                    'inline-field': this.props.sidebyside
                })}>
                <p className="field-label">{this.props.label}</p>
                <div className="field-outer">
                    <input
                        {...this.props}
                        onChange={this.props.onChange}
                        onClick={this.props.onClick}
                        className={classnames(
                            'field',
                            this.props.size,
                            this.props.kind,
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    size: PropTypes.oneOf(['normal', 'large']),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    kind: PropTypes.oneOf(['primary', 'secondary']),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    autoFocus: PropTypes.oneOf(['on', 'off']),
    spellCheck: PropTypes.oneOf(['true', 'false']),
    sidebyside: PropTypes.oneOf([1, 2]),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    present: PropTypes.bool,
    clearable: PropTypes.bool,
    leftIcon: PropTypes.string
};

const defaultProps = {
    size: 'normal',
    type: 'text',
    autoComplete: 'on',
    value: '',
    kind: 'primary'
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

    getClearMarkup() {
        if (this.props.clearable && !_.isEmpty(this.props.value)) {
            return (
                <i
                    className={classnames('material-icons', 'clear-icon', this.props.size, this.props.kind)}
                    onClick={this.onClearClick}>
                    clear
                </i>
            );
        }
    }

    onClearClick = () => {
        const e = { target: { value: '' } };
        this.props.onChange(e);
    };

    getLeftIconMarkup() {
        if (this.props.leftIcon) {
            return <i className={classnames('material-icons', 'left-icon', this.props.size)}>{this.props.leftIcon}</i>;
        }
    }

    render() {
        const { style, present, editable, clearable, leftIcon, ...inputProps } = this.props;
        if (present) {
            return (
                <div style={style} className="field-wrapper editable-field-wrapper">
                    <p className="field-label">{this.props.label}</p>
                    <p>{this.props.value}</p>
                </div>
            );
        }

        return (
            <div
                style={style}
                className={classnames('field-wrapper', this.props.className, {
                    'inline-field': this.props.sidebyside
                })}>
                <p className="field-label">{this.props.label}</p>
                <div className="field-outer">
                    {this.getLeftIconMarkup()}
                    <input
                        {...inputProps}
                        className={classnames(
                            'field',
                            this.props.size,
                            this.props.kind,
                            { 'first-side-by-side-input': this.props.sidebyside === 1 },
                            { 'second-side-by-side-input': this.props.sidebyside === 2 },
                            { 'field-error-border': this.props.error },
                            { 'clearable-field': this.props.clearable },
                            { 'include-left-icon': this.props.leftIcon }
                        )}
                    />
                    {this.getClearMarkup()}
                    <p className="field-error-label">{this.props.error}</p>
                </div>
            </div>
        );
    }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
export default Field;

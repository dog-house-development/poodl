import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    content: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    formButton: PropTypes.bool,
    dropdownButton: PropTypes.bool,
    id: PropTypes.string
};

const defaultProps = {
    size: 'medium',
    kind: 'primary',
    dropdownButton: false
};

class Button extends Component {
    render() {
        return (
            <button
                className={`button ${this.props.size} ${this.props.kind} ${this.props.formButton ? 'form-button' : ''}`}
                {...this.props}
            >
                {this.props.content ? this.props.content : this.props.children}
            </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;

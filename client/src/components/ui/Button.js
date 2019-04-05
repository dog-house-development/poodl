import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    content: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    formButton: PropTypes.bool,
    id: PropTypes.string
};

const defaultProps = {
    size: 'medium',
    kind: 'primary',
    type: 'button'
};

class Button extends Component {
    getContent() {
        if (this.props.loading) {
            return <Loading />;
        }

        return this.props.content || this.props.children;
    }
    render() {
        const { size, kind, formButton, ...buttonProps } = this.props;
        return (
            <button
                className={`button ${this.props.size} ${this.props.kind} ${this.props.formButton ? 'form-button' : ''}`}
                {...buttonProps}>
                {this.getContent()}
            </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;

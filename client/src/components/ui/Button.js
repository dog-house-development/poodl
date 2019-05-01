import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import classnames from 'classnames';

const propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    content: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    formButton: PropTypes.bool,
    id: PropTypes.string,
    icon: PropTypes.string,
    width: PropTypes.string,
    autoFocus: PropTypes.bool
};

const defaultProps = {
    size: 'medium',
    kind: 'primary',
    type: 'button'
};

class Button extends Component {
    getIconMarkup() {
        if (this.props.icon) {
            return <i className="material-icons button-icon">{this.props.icon}</i>;
        }
    }

    getContent() {
        if (this.props.loading) {
            return <Loading />;
        }

        return (
            <>
                {this.getIconMarkup()} {this.props.content || this.props.children}
            </>
        );
    }

    getWidth() {
        if (this.props.width) {
            return { width: this.props.width, paddingLeft: 'unset', paddingRight: 'unset' };
        }
    }

    render() {
        const { content, size, kind, formButton, className, icon, width, ...buttonProps } = this.props;
        return (
            <button
                className={classnames('button', size, kind, { 'form-button': formButton }, { icon: icon }, className)}
                style={this.getWidth()}
                {...buttonProps}>
                {this.getContent()}
            </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    content: PropTypes.string.isRequired
};

const defaultProps = {
    size: 'medium',
    type: 'primary'
};

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onClick();
    }

    render() {
        return (
            <button onClick={this.handleClick} className={`button ${this.props.size} ${this.props.type}`}>
                {this.props.content}
            </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;

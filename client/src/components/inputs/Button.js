import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  kind: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  content: PropTypes.string.isRequired,
  type: PropTypes.string
};

const defaultProps = {
  size: "medium",
  kind: "primary"
};

class Button extends Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={`button ${this.props.size} ${this.props.kind}`}
        type={this.props.type}
      >
        {this.props.content}
      </button>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;

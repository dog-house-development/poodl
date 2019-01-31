import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.oneOf(["normal", "large"]),
  content: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.object
};

const defaultProps = {
  size: "normal",
  type: "text"
};

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  onComponentDidMount() {
    this.setState({ value: this.props.content });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  render() {
    return (
      <div>
        {this.props.label}
        <input
          id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          className={`field ${this.props.size}`}
          error={this.props.error}
        />
      </div>
    );
  }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
export default Field;

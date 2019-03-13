import React, { Component } from "react";

class EditableField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      originalValue: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
    this.props.handleChange(e);
  }

  render() {
    if (this.props.editMode) {
      return (
        <input
          id={this.props.id}
          value={this.state.value}
          onChange={this.handleChange}
          autoFocus="on"
        />
      );
    }
    return <p onClick={this.onClick}>{this.state.value}</p>;
  }
}

export default EditableField;

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../../../actions/authActions";

import Form from "../../inputs/Form";

const propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and admin navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newAdmin = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerAdmin(newAdmin, this.props.history);
  };

  getFields = () => {
    const { errors } = this.state;
    const fields = [
      {
        onChange: this.onChange,
        value: this.state.name,
        error: errors.name,
        id: "name",
        type: "text",
        label: "Name",
        placeholder: "Name..."
      },
      {
        onChange: this.onChange,
        value: this.state.email,
        error: errors.email,
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "Email..."
      },
      {
        onChange: this.onChange,
        value: this.state.password,
        error: errors.password,
        id: "password",
        type: "password",
        label: "Password",
        placeholder: "Password..."
      },
      {
        onChange: this.onChange,
        value: this.state.password2,
        error: errors.password2,
        id: "password2",
        type: "password",
        label: "Confirm Password",
        placeholder: "Confirm password..."
      }
    ];
    return fields;
  };

  render() {
    return (
      <div>
        <Link to="/">
          <i className="material-icons left">keyboard_backspace</i> Back to home
        </Link>
        <div>
          <h4>
            <b>Register</b> below
          </h4>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        <Form
          noValidate
          fields={this.getFields()}
          onSubmit={this.onSubmit}
          buttonLabel="Sign up"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Register.propTypes = propTypes;
export default connect(
  mapStateToProps,
  { registerAdmin }
)(withRouter(Register));

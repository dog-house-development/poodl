import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import Form from "../../inputs/Form";

const propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  getFields = () => {
    const { errors } = this.state;
    const fields = [
      {
        id: "email",
        type: "email",
        label: "Email",
        value: this.state.email,
        onChange: this.onChange,
        error: errors.email,
        placeholder: "Email..."
      },
      {
        id: "password",
        type: "password",
        label: "Password",
        value: this.state.password,
        onChange: this.onChange,
        error: errors.email,
        placeholder: "Password......"
      }
    ];
    return fields;
  };

  render() {
    return (
      <div>
        <Link to="/">Back to home</Link>
        <div>
          <h4>
            <b>Login</b> below
          </h4>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <Form
          fields={this.getFields()}
          onSubmit={this.onSubmit}
          noValidate
          buttonLabel="Log in"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Login.propTypes = propTypes;

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

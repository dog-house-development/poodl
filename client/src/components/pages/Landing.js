import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <h4>Welcome to Poodl!</h4>
        <p>The member management tool for rural senior centers!</p>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    );
  }
}

export default Landing;

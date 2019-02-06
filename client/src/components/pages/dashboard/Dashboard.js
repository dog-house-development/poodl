import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import Button from "../../inputs/Button";

const propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <h4>
          <p>Hey there, {user.name.split(" ")[0]}. You are now logged in</p>
        </h4>
        <Button content="log out" onClick={this.onLogoutClick} />
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  return {
    auth: state.auth
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

Dashboard.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

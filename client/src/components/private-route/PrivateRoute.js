import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const propTypes = {
  auth: PropTypes.object.isRequired
};

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

PrivateRoute.propTypes = propTypes;
export default connect(mapStateToProps)(PrivateRoute);

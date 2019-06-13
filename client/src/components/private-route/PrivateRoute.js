import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
    auth: PropTypes.object.isRequired
};

// This is a functional higher order component. See https://reactjs.org/docs/higher-order-components.html
export const PrivateRoute = ({ component: Component, auth, restrictAccess, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isAuthenticated && !auth.admin.accessLevel) {
                throw new Error('Admin must have an access level.');
            }

            if (auth.isAuthenticated && auth.admin.accessLevel !== restrictAccess) {
                return <Component {...props} />;
            }

            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            );
        }}
    />
);

export const mapStateToProps = state => ({
    auth: state.auth
});

PrivateRoute.propTypes = propTypes;
export default connect(mapStateToProps)(PrivateRoute);

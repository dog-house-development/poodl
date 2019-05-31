import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
    auth: PropTypes.object.isRequired
};

export const PrivateRoute = ({ component: Component, auth, restrictAccess, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            // console.log('render');
            // console.log(auth);
            if (auth.isAuthenticated && auth.admin.accessLevel !== restrictAccess) {
                // console.log('render 2');
                return <Component {...props} />;
            }

            // console.log('render 3');
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

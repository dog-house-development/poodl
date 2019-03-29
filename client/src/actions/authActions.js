import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import Types from './types';

export default {
    setCurrentAdmin: decoded => ({
        type: Types.auth.SET_CURRENT_ADMIN,
        payload: decoded
    }),

    loginAdmin: adminData => dispatch => {
        axios
            .post('/api/admins/login', adminData)
            .then(res => {
                // Save to localStorage

                // Set token to localStorage
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header
                setAuthToken(token);
                // Decode token to get admin data
                const decoded = jwt_decode(token);
                // Set current admin
                dispatch({
                    type: Types.auth.login.SUCCESS,
                    payload: decoded
                });
            })
            .catch(err =>
                dispatch({
                    type: Types.auth.ERROR,
                    payload: err.response.data
                })
            );
    },

    logoutAdmin: () => dispatch => {
        // Remove token from local storage
        localStorage.removeItem('jwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current admin to empty object {} which will set isAuthenticated to false
        dispatch({
            type: Types.auth.logout.SUCCESS,
            payload: {}
        });
    }
};

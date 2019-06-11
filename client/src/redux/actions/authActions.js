import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import Types from './types';
import { getErrors } from './utils/ActionHelper';
import jwt_decode from 'jwt-decode';

export default {
    setCurrentAdmin: admin => {
        return {
            type: Types.auth.SET_CURRENT_ADMIN,
            payload: admin
        };
    },

    loginAdmin: adminData => async dispatch => {
        dispatch({
            type: Types.auth.login.BEGIN
        });
        try {
            // Send api request to login
            const res = await axios.post('/api/admins/login', adminData);
            const { token } = res.data;
            // Set localStorage with token
            localStorage.setItem('jwtToken', token);
            // Set Auth Header with token
            setAuthToken(token);
            // Decode token to get admin data
            // Use jwt-decode instead of jsonwebtoken so you don't have
            // to remove 'Bearer' from the token
            const decoded = jwt_decode(token);
            // Set current admin
            dispatch({
                type: Types.auth.login.SUCCESS,
                payload: decoded
            });
        } catch (err) {
            getErrors(dispatch, Types.auth, err);
        }
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
    },

    refreshToken: () => async dispatch => {
        try {
            // Send api request for new token
            const res = await axios.get('/api/admins/refresh-token');
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
        } catch (err) {
            getErrors(dispatch, Types.auth, err);
        }
    }
};

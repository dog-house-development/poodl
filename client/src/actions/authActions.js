import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_ADMIN, ADMIN_LOADING } from './types';

// Register Admin
export const registerAdmin = (adminData, history) => dispatch => {
    axios
        .post('/api/admins/register', adminData)
        .then(res => history.push('/dashboard')) // link to the new admins details page when it is created
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get admin token
export const loginAdmin = adminData => dispatch => {
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
            dispatch(setCurrentAdmin(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in admin
export const setCurrentAdmin = decoded => {
    return {
        type: SET_CURRENT_ADMIN,
        payload: decoded
    };
};

// Admin loading
export const setAdminLoading = () => {
    return {
        type: ADMIN_LOADING
    };
};

// Log admin out
export const logoutAdmin = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current admin to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentAdmin({}));
};

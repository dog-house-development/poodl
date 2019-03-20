import axios from 'axios';

import { GET_ERRORS, FETCH_ADMINS_BEGIN, FETCH_ADMINS_SUCCESS, FETCH_ADMIN_BEGIN, FETCH_ADMIN_SUCCESS } from './types';

export const fetchAdmins = () => dispatch => {
    dispatch(fetchAdminsBegin());
    axios
        .post('/api/admins/filter', { accessLevel: { $ne: 'Volunteer' } })
        .then(res => {
            dispatch(fetchAdminsSuccess(res.data));
            return res.data;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Get specificied admin by ID
export const fetchAdmin = id => dispatch => {
    dispatch(fetchAdminBegin());
    axios
        .get(`/api/admins/${id}`)
        .then(res => {
            dispatch(fetchAdminSuccess(res.data));
            return res.data;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const fetchAdminsBegin = () => ({
    type: FETCH_ADMINS_BEGIN
});

export const fetchAdminsSuccess = admins => ({
    type: FETCH_ADMINS_SUCCESS,
    payload: admins
});

export const fetchAdminBegin = () => ({
    type: FETCH_ADMIN_BEGIN
});

export const fetchAdminSuccess = admin => ({
    type: FETCH_ADMIN_SUCCESS,
    payload: admin
});

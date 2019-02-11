import axios from 'axios';

import { GET_ERRORS, FETCH_ADMINS_BEGIN, FETCH_ADMINS_SUCCESS } from './types';

export const fetchAdmins = () => dispatch => {
    dispatch(fetchAdminsBegin());
    axios
        .get('/api/admins/get')
        .then(res => res.json())
        .then(json => {
            dispatch(fetchAdminsSuccess(json.admins));
            return json.admins;
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
    payload: { admins }
});

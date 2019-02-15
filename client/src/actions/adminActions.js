import axios from 'axios';

import { GET_ERRORS, FETCH_PRODUCTS_BEGIN, FETCH_PRODUCTS_SUCCESS } from './types';

export const fetchAdmins = () => dispatch => {
    dispatch(fetchAdminsBegin());
    axios
        .get('/api/admins/get')
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

export const fetchAdminsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchAdminsSuccess = admins => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { admins }
});

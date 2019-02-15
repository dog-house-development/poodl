import axios from 'axios';

import { GET_ERRORS, FETCH_VOLUNTEERS_BEGIN, FETCH_VOLUNTEERS_SUCCESS } from './types';

export const fetchVolunteers = () => dispatch => {
    dispatch(fetchVolunteersBegin());
    axios
        .get('/api/volunteers/get')
        .then(res => {
            dispatch(fetchVolunteersSuccess(res.data));
            return res.data;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const fetchVolunteersBegin = () => ({
    type: FETCH_VOLUNTEERS_BEGIN
});

export const fetchVolunteersSuccess = volunteers => ({
    type: FETCH_VOLUNTEERS_SUCCESS,
    payload: { volunteers }
});

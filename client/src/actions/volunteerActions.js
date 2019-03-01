import axios from 'axios';

import {
    GET_ERRORS,
    FETCH_VOLUNTEERS_BEGIN,
    FETCH_VOLUNTEERS_SUCCESS,
    FETCH_VOLUNTEER_BEGIN,
    FETCH_VOLUNTEER_SUCCESS
} from './types';

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

//Get specificied volunteer by ID
export const fetchVolunteer = id => dispatch => {
    dispatch(fetchVolunteerBegin());
    axios
        .get(`/api/volunteers/get/${id}`)
        .then(res => {
            dispatch(fetchVolunteerSuccess(res.data));
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
    payload: volunteers
});

export const fetchVolunteerBegin = () => ({
    type: FETCH_VOLUNTEER_BEGIN
});

export const fetchVolunteerSuccess = volunteer => ({
    type: FETCH_VOLUNTEER_SUCCESS,
    payload: volunteer
});

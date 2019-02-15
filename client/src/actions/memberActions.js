import axios from 'axios';

import { GET_ERRORS, FETCH_MEMBERS_BEGIN, FETCH_MEMBERS_SUCCESS } from './types';

export const fetchMembers = () => dispatch => {
    dispatch(fetchMembersBegin());
    axios
        .get('/api/members/get')
        .then(res => {
            dispatch(fetchMembersSuccess(res.data));
            return res.data;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const fetchMembersBegin = () => ({
    type: FETCH_MEMBERS_BEGIN
});

export const fetchMembersSuccess = members => ({
    type: FETCH_MEMBERS_SUCCESS,
    payload: { members }
});

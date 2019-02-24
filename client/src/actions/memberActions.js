import axios from 'axios';

import {
    GET_ERRORS,
    FETCH_MEMBERS_BEGIN,
    FETCH_MEMBERS_SUCCESS,
    FETCH_MEMBER_BEGIN,
    FETCH_MEMBER_SUCCESS
} from './types';

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

//Get specific Member by // ID
export const fetchMember = id => dispatch => {
    dispatch(fetchMemberBegin());
    axios
        .get(`/api/members/get/${id}`)
        .then(res => {
            dispatch(fetchMemberSuccess(res.data));
            return res.data;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get Member Identifier
export const viewMember = memberData => dispatch => {
    axios.post('/api/members/viewMember', memberData).catch(err =>
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

export const fetchMemberBegin = () => ({
    type: FETCH_MEMBER_BEGIN
});

export const fetchMemberSuccess = member => ({
    type: FETCH_MEMBER_SUCCESS,
    payload: { member }
});

import axios from 'axios';

import {
    GET_ERRORS,
    FETCH_MEMBERS_BEGIN,
    FETCH_MEMBERS_SUCCESS,
    FETCH_MEMBER_BEGIN,
    FETCH_MEMBER_SUCCESS,
    MODIFY_MEMBER_BEGIN,
    MODIFY_MEMBER_SUCCESS
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

//Get specificied member by ID
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

//Get specificied member by ID
export const modifyMember = id => dispatch => {
    dispatch(modifyMemberBegin());
    axios
        .get(`/api/members/modify/${id}`)
        .then(res => {
            dispatch(modifyMemberSuccess(res.data));
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
    payload: members
});

export const fetchMemberBegin = () => ({
    type: FETCH_MEMBER_BEGIN
});

export const fetchMemberSuccess = member => ({
    type: FETCH_MEMBER_SUCCESS,
    payload: member
});

export const modifyMemberBegin = () => ({
    type: MODIFY_MEMBER_BEGIN
});

export const modifyMemberSuccess = member => ({
    type: MODIFY_MEMBER_SUCCESS,
    payload: member
});

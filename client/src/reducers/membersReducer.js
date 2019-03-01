import { FETCH_MEMBERS_BEGIN, FETCH_MEMBERS_SUCCESS, FETCH_MEMBER_BEGIN, FETCH_MEMBER_SUCCESS } from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    member: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEMBERS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_MEMBERS_SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload.members
            };
        case FETCH_MEMBER_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                member: action.payload
            };
        default:
            return state;
    }
}

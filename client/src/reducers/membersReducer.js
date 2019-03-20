import {
    FETCH_MEMBERS_BEGIN,
    FETCH_MEMBERS_SUCCESS,
    FETCH_MEMBER_BEGIN,
    FETCH_MEMBER_SUCCESS,
    EDIT_MEMBER_BEGIN,
    EDIT_MEMBER_SUCCESS
} from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    one: {}
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
                all: action.payload.data
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
                one: action.payload
            };
        case EDIT_MEMBER_BEGIN:
            return {
                ...state,
                loading: true
            };
        case EDIT_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

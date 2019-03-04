import { FETCH_ADMINS_BEGIN, FETCH_ADMINS_SUCCESS, FETCH_ADMIN_BEGIN, FETCH_ADMIN_SUCCESS } from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    one: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_ADMINS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload.data
            };
        case FETCH_ADMIN_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                one: action.payload
            };
        default:
            return state;
    }
}

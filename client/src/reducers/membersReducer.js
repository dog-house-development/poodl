import { FETCH_MEMBERS_BEGIN, FETCH_MEMBERS_SUCCESS } from '../actions/types';

const initialState = {
    loading: false,
    all: []
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
        default:
            return state;
    }
}

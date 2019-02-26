import { FETCH_ADMINS_BEGIN, FETCH_ADMINS_SUCCESS } from '../actions/types';

const initialState = {
    loading: false,
    all: []
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
        default:
            return state;
    }
}

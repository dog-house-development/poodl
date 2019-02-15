import { FETCH_VOLUNTEERS_BEGIN, FETCH_VOLUNTEERS_SUCCESS } from '../actions/types';

const initialState = {
    loading: false,
    all: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_VOLUNTEERS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_VOLUNTEERS_SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload.volunteers
            };
        default:
            return state;
    }
}

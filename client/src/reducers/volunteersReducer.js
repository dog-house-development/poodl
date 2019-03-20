import {
    FETCH_VOLUNTEERS_BEGIN,
    FETCH_VOLUNTEERS_SUCCESS,
    FETCH_VOLUNTEER_BEGIN,
    FETCH_VOLUNTEER_SUCCESS
} from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    one: {}
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
                all: action.payload
            };
        case FETCH_VOLUNTEER_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_VOLUNTEER_SUCCESS:
            return {
                ...state,
                loading: false,
                one: action.payload
            };
        default:
            return state;
    }
}

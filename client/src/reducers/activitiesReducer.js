import {
    FETCH_ACTIVITY_BEGIN,
    FETCH_ACTIVITY_SUCCESS,
    FILTER_ACTIVITIES_BEGIN,
    FILTER_ACTIVITIES_SUCCESS
} from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    one: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FILTER_ACTIVITIES_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FILTER_ACTIVITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload
            };
        case FETCH_ACTIVITY_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_ACTIVITY_SUCCESS:
            return {
                ...state,
                loading: false,
                one: action.payload
            };
        default:
            return state;
    }
}

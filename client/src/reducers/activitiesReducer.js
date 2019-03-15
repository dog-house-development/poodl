import { FILTER_ACTIVITIES_BEGIN, FILTER_ACTIVITIES_SUCCESS } from '../actions/types';

const initialState = {
    loading: false,
    all: []
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
                all: action.payload.data
            };
        default:
            return state;
    }
}

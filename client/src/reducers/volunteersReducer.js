import { FETCH_PRODUCTS_BEGIN, FETCH_PRODUCTS_SUCCESS } from '../actions/types';

const initialState = {
    loading: false,
    all: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload.volunteers
            };
        default:
            return state;
    }
}

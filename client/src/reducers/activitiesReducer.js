import Types from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    errors: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case Types.activity.ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case Types.activity.filter.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.activity.filter.SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload,
                errors: {}
            };
        case Types.activity.get.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.activity.get.SUCCESS:
            return {
                ...state,
                loading: false,
                all: { [action.payload._id]: action.payload },
                errors: {}
            };
        default:
            return state;
    }
}

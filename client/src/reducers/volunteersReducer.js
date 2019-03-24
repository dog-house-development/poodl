import Types from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    errors: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case Types.volunteer.ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case Types.volunteer.filter.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.volunteer.filter.SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload,
                errors: {}
            };
        case Types.volunteer.get.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.volunteer.get.SUCCESS:
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

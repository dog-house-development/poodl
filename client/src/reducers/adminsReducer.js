import Types from '../actions/types';

const initialState = {
    loading: false,
    all: [],
    errors: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case Types.admin.ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case Types.admin.filter.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.admin.filter.SUCCESS:
            return {
                ...state,
                loading: false,
                all: action.payload,
                errors: {}
            };
        case Types.admin.get.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.admin.get.SUCCESS:
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

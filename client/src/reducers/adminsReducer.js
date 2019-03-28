import Types from '../actions/types';
import _ from 'lodash';

const initialState = {
    loading: false,
    all: {},
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
                all: _.keyBy(action.payload, '_id'),
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
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        default:
            return state;
    }
}

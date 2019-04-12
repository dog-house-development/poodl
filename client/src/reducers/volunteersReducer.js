import Types from '../actions/types';
import _ from 'lodash';

const initialState = {
    loading: false,
    all: {},
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
                all: _.keyBy(action.payload, '_id'),
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
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        case Types.volunteer.edit.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.volunteer.edit.SUCCESS:
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

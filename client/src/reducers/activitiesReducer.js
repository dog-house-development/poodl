import Types from '../actions/types';
import _ from 'lodash';

const initialState = {
    loading: false,
    all: {},
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
                all: _.keyBy(action.payload, '_id'),
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
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        case Types.activity.edit.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.activity.edit.SUCCESS:
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

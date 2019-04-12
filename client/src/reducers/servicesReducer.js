import Types from '../actions/types';
import _ from 'lodash';

const initialState = {
    loading: false,
    all: {},
    errors: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case Types.service.ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case Types.service.create.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.service.create.SUCCESS:
            return {
                ...state,
                loading: false,
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        case Types.service.filter.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.service.filter.SUCCESS:
            return {
                ...state,
                loading: false,
                all: _.keyBy(action.payload, '_id'),
                errors: {}
            };
        case Types.service.get.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.service.get.SUCCESS:
            return {
                ...state,
                loading: false,
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        case Types.service.edit.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.service.edit.SUCCESS:
            return {
                ...state,
                loading: false,
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        case Types.service.delete.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.service.delete.SUCCESS:
            const { [action.payload._id]: deletedService, ...newState } = state.all;
            return {
                ...state,
                loading: false,
                all: newState,
                errors: {}
            };
        default:
            return state;
    }
}

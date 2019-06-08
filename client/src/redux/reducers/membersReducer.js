import Types from '../actions/types';
import _ from 'lodash';

const initialState = {
    loading: false,
    all: {},
    errors: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case Types.member.ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case Types.member.filter.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.member.filter.SUCCESS:
            return {
                ...state,
                loading: false,
                all: _.keyBy(action.payload, '_id'),
                errors: {}
            };
        case Types.member.get.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.member.get.SUCCESS:
            return {
                ...state,
                loading: false,
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        case Types.member.edit.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.member.edit.SUCCESS:
            return {
                ...state,
                loading: false,
                all: { ...state.all, [action.payload._id]: action.payload },
                errors: {}
            };
        case Types.member.delete.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.member.delete.SUCCESS:
            const { [action.payload._id]: deletedActivity, ...newState } = state.all;
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

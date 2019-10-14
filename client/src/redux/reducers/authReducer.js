import Types from '../actions/types';
import _ from 'lodash';

const initialState = {
    isAuthenticated: false,
    admin: {},
    loading: false,
    errors: {},
    logoutWhenLeaveCheckIn: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case Types.auth.SET_CURRENT_ADMIN:
            return {
                ...state,
                isAuthenticated: !_.isEmpty(action.payload),
                admin: action.payload
            };
        case Types.auth.login.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.auth.login.SUCCESS:
            return {
                ...state,
                isAuthenticated: !_.isEmpty(action.payload),
                admin: action.payload,
                loading: false
            };
        case Types.auth.logout.SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                admin: {}
            };
        case Types.auth.resetPasswordEmail.BEGIN:
            return {
                ...state,
                loading: true
            };
        case Types.auth.resetPasswordEmail.SUCCESS:
            return {
                ...state,
                loading: false
            };
        case Types.auth.ERROR:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

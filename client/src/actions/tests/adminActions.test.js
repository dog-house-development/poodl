import * as actions from '../adminActions';
import * as types from '../types';

describe('admin actions', () => {
    it('should create an action to begin fetching admins', () => {
        const expectedAction = {
            type: types.FETCH_ADMINS_BEGIN
        };
        expect(actions.fetchAdminsBegin()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched admins', () => {
        const admins = {
            all: [],
            loading: false
        };
        const expectedAction = {
            type: types.FETCH_ADMINS_SUCCESS,
            payload: admins
        };
        expect(actions.fetchAdminsSuccess(admins)).toEqual(expectedAction);
    });

    it('should create an action to begin fetching specific admin', () => {
        const expectedAction = {
            type: types.FETCH_ADMIN_BEGIN
        };
        expect(actions.fetchAdminBegin()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched specific admin', () => {
        const admin = {
            one: {},
            loading: false
        };
        const expectedAction = {
            type: types.FETCH_ADMIN_SUCCESS,
            payload: admin
        };
        expect(actions.fetchAdminSuccess(admin)).toEqual(expectedAction);
    });
});

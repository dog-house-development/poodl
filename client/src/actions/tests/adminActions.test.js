import * as actions from '../adminActions';
import * as types from '../types';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore();

describe('adminActions', () => {
    beforeEach(() => {
        // Runs before each test in the suite
        store.clearActions();
    });
    describe('create', () => {
        test('Dispatches the correct action and payload', () => {
            const admin = {
                one: {},
                loading: false
            };
            const expectedActions = [
                {
                    payload: admin,
                    type: 'FILTER_ADMINS_BEGIN'
                }
            ];

            store.dispatch(adminActions.create(admin));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should create an action to begin fetching admins', () => {
        const expectedAction = {
            type: types.FILTER_ADMINS_BEGIN
        };
        expect(actions.admins.filter()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched admins', () => {
        const admins = {
            all: [],
            loading: false
        };
        const expectedAction = {
            type: types.FILTER_ADMINS_SUCCESS,
            payload: admins
        };
        expect(actions.fetchAdminsSuccess(admins)).toEqual(expectedAction);
    });

    it('should create an action to begin fetching specific admin', () => {
        const expectedAction = {
            type: types.FILTER_ADMIN_BEGIN
        };
        expect(actions.fetchAdminBegin()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched specific admin', () => {
        const admin = {
            one: {},
            loading: false
        };
        const expectedAction = {
            type: types.FILTER_ADMIN_SUCCESS,
            payload: admin
        };
        expect(actions.fetchAdminSuccess(admin)).toEqual(expectedAction);
    });
});

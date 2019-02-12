import * as actions from '../authActions';
import * as types from '../types';

describe('auth actions', () => {
    it('should create an action to set admin loading', () => {
        const expectedAction = {
            type: types.ADMIN_LOADING
        };
        expect(actions.setAdminLoading()).toEqual(expectedAction);
    });

    it('should set logged in admin', () => {
        const decoded = {
            auth: {
                isAuthenticated: true,
                loading: false,
                admin: {
                    name: 'Sam',
                    email: 'goot@nowhere.com'
                }
            }
        };
        const expectedAction = {
            type: types.SET_CURRENT_ADMIN,
            payload: decoded
        };
        expect(actions.setCurrentAdmin(decoded)).toEqual(expectedAction);
    });
});

import reducer from '../../reducers/authReducer';
import Types from '../../actions/types';

describe('initialState', () => {
    it('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = {
            isAuthenticated: false,
            admin: {},
            loading: false,
            errors: {},
            logoutWhenLeaveCheckIn: false
        };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('GET_AUTH_ERRORS', () => {
    it('returns the auth.ERROR state', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.auth.ERROR, payload: mockPayload };
        const expectedState = {
            admin: {},
            errors: { error: 'so many error' },
            isAuthenticated: false,
            loading: false,
            logoutWhenLeaveCheckIn: false
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('SET_CURRENT_ADMIN', () => {
    it('returns the  set current admin state', () => {
        const testAdmin = { firstName: 'Test', _id: '0' };
        const mockPayload = { admin: testAdmin, isAuthenticated: true };
        const action = { type: Types.auth.SET_CURRENT_ADMIN, payload: mockPayload };
        const expectedState = {
            admin: { admin: { firstName: 'Test', _id: '0' }, isAuthenticated: true },
            isAuthenticated: true,
            loading: false,
            errors: {},
            logoutWhenLeaveCheckIn: false
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('login.SUCCESS', () => {
    it('returns the  filter.BEGIN state', () => {
        const testAdmin = { firstName: 'Test', _id: '0' };
        const mockPayload = { admin: testAdmin, isAuthenticated: true };
        const action = { type: Types.auth.login.SUCCESS, payload: mockPayload };
        const expectedState = {
            admin: { admin: { firstName: 'Test', _id: '0' }, isAuthenticated: true },
            isAuthenticated: true,
            loading: false,
            errors: {},
            logoutWhenLeaveCheckIn: false
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('logout.SUCCESS', () => {
    it('returns the filter.SUCCESS state', () => {
        const testAdmin = { firstName: 'Test', _id: '0' };
        const mockPayload = { admin: testAdmin, isAuthenticated: true };
        const action = { type: Types.auth.logout.SUCCESS, payload: mockPayload };
        const expectedState = {
            admin: {},
            isAuthenticated: false,
            loading: false,
            errors: {},
            logoutWhenLeaveCheckIn: false
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

import reducer from '../../reducers/adminsReducer';
import Types from '../../actions/types';
const ADMIN_DATA = require('./data/admins');
const admins = ADMIN_DATA.admins;
describe('initialState', () => {
    it('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('GET_ADMIN_ERRORS', () => {
    it('returns the admin.ERROR state', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.admin.ERROR, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: { error: 'so many error' } };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_ADMINS_BEGIN', () => {
    it('returns the filter.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_ADMIN_BEGIN', () => {
    it('returns the get.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_ADMIN_SUCCESS', () => {
    it('returns the get.SUCCESS state', () => {
        const testData = { firstName: 'Test', _id: '0' };
        const mockPayload = { all: testData };
        const action = { type: Types.admin.get.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { undefined: { all: { _id: '0', firstName: 'Test' } } },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_ADMIN_BEGIN', () => {
    it('returns the edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_ADMIN_BEGIN', () => {
    it('returns the delete.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

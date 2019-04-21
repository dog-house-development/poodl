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

describe('FILTER_ADMIN_BEGIN', () => {
    it('returns the  filter.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_ADMIN_SUCCESS', () => {
    it('returns the filter.SUCCESS state', () => {
        const testData = { firstName: 'Test', _id: '0' };
        const mockPayload = { loading: false, all: testData, errors: {} };
        const action = { type: Types.admin.filter.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { 0: { firstName: 'Test', _id: '0' }, undefined: {} },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_ADMIN_BEGIN', () => {
    it('returns the  get.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_ADMIN_BEGIN', () => {
    it('returns the  edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_ADMIN_SUCCESS', () => {
    it('returns the edit.SUCCESS state', () => {
        const mockPayload = { all: admins };
        const action = { type: Types.admin.edit.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: {
                undefined: {
                    all: [
                        { _id: '123', firstName: 'Bob', lastName: 'Bub' },
                        { _id: '321', firstName: 'Lil', lastName: 'Tup' }
                    ]
                }
            },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_ADMIN_BEGIN', () => {
    it('returns the  delete.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.admin.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_ADMIN_SUCCESS', () => {
    it('returns the delete.SUCCESS state', () => {
        const deletedadmin = { firstName: 'John', _id: '123' };
        const mockPayload = { payload: admins, deletedadmin };
        const action = { type: Types.admin.delete.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: {},
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

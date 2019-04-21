import reducer from '../../reducers/membersReducer';
import Types from '../../actions/types';
const MEMBER_DATA = require('./data/members');
const members = MEMBER_DATA.members;
describe('initialState', () => {
    it('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('GET_MEMBER_ERRORS', () => {
    it('returns the member.ERROR state', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.member.ERROR, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: { error: 'so many error' } };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_MEMBER_BEGIN', () => {
    it('returns the  filter.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.member.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_MEMBER_SUCCESS', () => {
    it('returns the filter.SUCCESS state', () => {
        const testData = { firstName: 'Test', _id: '0' };
        const mockPayload = { loading: false, all: testData, errors: {} };
        const action = { type: Types.member.filter.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { 0: { firstName: 'Test', _id: '0' }, undefined: {} },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_MEMBER_BEGIN', () => {
    it('returns the  get.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.member.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_MEMBER_SUCCESS', () => {
    it('returns the get.SUCCESS state', () => {
        const testData = { firstName: 'Test', _id: '0' };
        const mockPayload = { all: testData };
        const action = { type: Types.member.get.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { undefined: { all: { _id: '0', firstName: 'Test' } } },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_MEMBER_BEGIN', () => {
    it('returns the  edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.member.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_MEMBER_SUCCESS', () => {
    it('returns the edit.SUCCESS state', () => {
        const testData = { firstName: 'Test', _id: '0' };
        const mockPayload = { all: members };
        const action = { type: Types.member.edit.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: {
                undefined: {
                    all: [
                        { _id: 432, firstName: 'Bobby', lastName: 'Bubby' },
                        { _id: 543, firstName: 'Lilly', lastName: 'Tuple' }
                    ]
                }
            },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_MEMBER_BEGIN', () => {
    it('returns the  delete.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.member.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_MEMBER_SUCCESS', () => {
    it('returns the delete.SUCCESS state', () => {
        const testData = { firstName: 'Test', _id: '0' };
        const deletedmember = { firstName: 'John', _id: '123' };
        const mockPayload = { payload: testData, deletedmember };
        const action = { type: Types.member.delete.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: {},
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

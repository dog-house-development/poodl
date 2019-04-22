import reducer from '../../reducers/activitiesReducer';
import Types from '../../actions/types';
const ACTIVITY_DATA = require('./data/activities');
const activities = ACTIVITY_DATA.activities;

describe('initialState', () => {
    it('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('CREATE_ACTIVITY_BEGIN', () => {
    it('returns the  create.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.activity.create.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('CREATE_ACTIVITY_SUCCESS', () => {
    it('returns the create.SUCCESS state', () => {
        const mockPayload = { loading: false };
        const action = { type: Types.activity.create.SUCCESS, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_ACTIVITY_ERRORS', () => {
    it('returns the activity.ERROR state', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.activity.ERROR, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: { error: 'so many error' } };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_ACTIVITY_BEGIN', () => {
    it('returns the  filter.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.activity.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_ACTIVITY_BEGIN', () => {
    it('returns the  get.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.activity.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_ACTIVITY_SUCCESS', () => {
    it('returns the get.SUCCESS state', () => {
        const mockPayload = { all: activities };
        const action = { type: Types.activity.get.SUCCESS, payload: mockPayload };
        const expectedState = {
            all: {
                undefined: {
                    all: [
                        { _id: 123, description: 'test', name: 'test1' },
                        { _id: 223, description: 'test', name: 'test2' }
                    ]
                }
            },
            errors: {},
            loading: false
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_ACTIVITY_BEGIN', () => {
    it('returns the  edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.activity.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_ACTIVITY_BEGIN', () => {
    it('returns the  delete.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.activity.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

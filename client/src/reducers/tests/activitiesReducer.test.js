import reducer from '../../reducers/activitiesReducer';
import Types from '../../actions/types';

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

describe('FILTER_ACTIVITY_SUCCESS', () => {
    it('returns the filter.SUCCESS state', () => {
        const testData = { name: 'Test', _id: '0' };
        const mockPayload = { loading: false, all: testData, errors: {} };
        const action = { type: Types.activity.filter.SUCCESS, payload: mockPayload };
        const expectedState = { loading: false, all: { 0: { name: 'Test', _id: '0' }, undefined: {} }, errors: {} };

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

describe('EDIT_ACTIVITY_BEGIN', () => {
    it('returns the  edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.activity.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

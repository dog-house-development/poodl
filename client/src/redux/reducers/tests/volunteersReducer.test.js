import reducer from '../../reducers/volunteersReducer';
import Types from '../../actions/types';

describe('initialState', () => {
    it('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('GET_VOLUNTEER_ERRORS', () => {
    it('returns the volunteer.ERROR state', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.volunteer.ERROR, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: { error: 'so many error' } };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_VOLUNTEER_BEGIN', () => {
    it('returns the  filter.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.volunteer.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_VOLUNTEER_BEGIN', () => {
    it('returns the  get.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.volunteer.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_VOLUNTEER_SUCCESS', () => {
    it('returns the get.SUCCESS state', () => {
        const testData = { firstName: 'Test', _id: '0' };
        const mockPayload = { all: testData };
        const action = { type: Types.volunteer.get.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { undefined: { all: { _id: '0', firstName: 'Test' } } },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_VOLUNTEER_BEGIN', () => {
    it('returns the  edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.volunteer.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_VOLUNTEER_BEGIN', () => {
    it('returns the  delete.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.volunteer.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

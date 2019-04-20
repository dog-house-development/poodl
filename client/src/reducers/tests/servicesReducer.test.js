import reducer from '../../reducers/servicesReducer';
import Types from '../../actions/types';

describe('initialState', () => {
    test('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('CREATE_SERVICE_BEGIN', () => {
    test('returns the  create.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.create.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_ERRORS', () => {
    test('returns the service.ERROR state', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.service.ERROR, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: { error: 'so many error' } };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_SERVICES_BEGIN', () => {
    test('returns the  filter.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_SERVICES_SUCCESS', () => {
    test('returns the filter.SUCCESS state', () => {
        const testData = { name: 'Test', _id: '0' };
        const mockPayload = { loading: false, all: testData, errors: {} };
        const action = { type: Types.service.filter.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { 0: { name: 'Test', _id: '0' }, undefined: {} },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_BEGIN', () => {
    test('returns the  get.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_SERVICE_BEGIN', () => {
    test('returns the  edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

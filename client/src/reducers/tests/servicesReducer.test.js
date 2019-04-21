import reducer from '../../reducers/servicesReducer';
import Types from '../../actions/types';

describe('initialState', () => {
    it('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('CREATE_SERVICE_BEGIN', () => {
    it('runs create.BEGIN', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.create.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_ERRORS', () => {
    it('runs service.ERROR', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.service.ERROR, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: { error: 'so many error' } };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_SERVICES_BEGIN', () => {
    it('runs filter.BEGIN', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_SERVICES_SUCCESS', () => {
    it('returns the filter.SUCCESS state', () => {
        const testData = { name: 'Test', _id: '0' };
        const mockPayload = { all: testData };
        const action = { type: Types.service.filter.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { 0: { name: 'Test', _id: '0' } },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_BEGIN', () => {
    it('runs get.BEGIN', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});
describe('GET_SERVICE_SUCCESS', () => {
    it('returns the get.SUCCESS state', () => {
        const testData = { name: 'Test', _id: '0' };
        const mockPayload = { all: testData };
        const action = { type: Types.service.get.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { undefined: { all: { _id: '0', name: 'Test' } } },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_SERVICE_BEGIN', () => {
    it('runs edit.BEGIN', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});
describe('DELETE_SERVICE_BEGIN', () => {
    it('returns the  delete.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});
describe('DELETE_SERVICE_SUCCESS', () => {
    it('runs delete.SUCCESS', () => {
        const testData = { name: 'Test', _id: '0' };
        const deletedVolunteer = { name: 'Yoga', _id: '123' };
        const mockPayload = { payload: testData, deletedVolunteer };
        const action = { type: Types.volunteer.delete.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: {},
            errors: {}
        };
        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

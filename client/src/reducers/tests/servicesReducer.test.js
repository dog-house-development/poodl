import reducer from '../../reducers/servicesReducer';
import Types from '../../actions/types';
const SERVICE_DATA = require('./data/services');
const services = SERVICE_DATA.services;
describe('initialState', () => {
    it('is correct', () => {
        const action = { type: 'dummy_state' };
        const initialState = { loading: false, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(initialState);
    });
});

describe('CREATE_SERVICE_BEGIN', () => {
    it('returns the  create.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.create.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('CREATE_SERVICE_SUCCESS', () => {
    it('returns the get.SUCCESS state', () => {
        const mockPayload = { all: services };
        const action = { type: Types.service.create.SUCCESS, payload: mockPayload };
        const expectedState = {
            all: {
                undefined: {
                    all: [{ _id: 987, name: 'Food Delivery' }, { _id: 789, name: 'Insulin' }]
                }
            },
            errors: {},
            loading: false
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_ERRORS', () => {
    it('returns the service.ERROR state', () => {
        const mockPayload = { error: 'so many error' };
        const action = { type: Types.service.ERROR, payload: mockPayload };
        const expectedState = { loading: false, all: {}, errors: { error: 'so many error' } };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_SERVICE_BEGIN', () => {
    it('should set loading = true', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_BEGIN', () => {
    it('should set loading = true', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_SUCCESS', () => {
    it('should set loading to false and return services', () => {
        const mockPayload = { all: services };
        const action = { type: Types.service.get.SUCCESS, payload: mockPayload };
        const expectedState = {
            all: {
                undefined: {
                    all: [{ _id: 987, name: 'Food Delivery' }, { _id: 789, name: 'Insulin' }]
                }
            },
            errors: {},
            loading: false
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('EDIT_SERVICE_BEGIN', () => {
    it('should set loading = true', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('DELETE_SERVICE_BEGIN', () => {
    it('should set loading = true', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

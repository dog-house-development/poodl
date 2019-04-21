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
    it('returns the  filter.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.filter.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('FILTER_SERVICE_SUCCESS', () => {
    it('returns the filter.SUCCESS state', () => {
        const testData = { name: 'Test', _id: 0 };
        const mockPayload = { loading: false, all: testData, errors: {} };
        const action = { type: Types.service.filter.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: { 0: { name: 'Test', _id: 0 }, undefined: {} },
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_BEGIN', () => {
    it('returns the  get.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.get.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

describe('GET_SERVICE_SUCCESS', () => {
    it('returns the get.SUCCESS state', () => {
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
    it('returns the  edit.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.edit.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});
describe('EDIT_SERVICE_SUCCESS', () => {
    it('returns the filter.SUCCESS state', () => {
        const mockPayload = { all: services };
        const action = { type: Types.service.edit.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
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

describe('DELETE_SERVICE_BEGIN', () => {
    it('returns the  delete.BEGIN state', () => {
        const mockPayload = { loading: true };
        const action = { type: Types.service.delete.BEGIN, payload: mockPayload };
        const expectedState = { loading: true, all: {}, errors: {} };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});
describe('DELETE_SERVICE_SUCCESS', () => {
    it('returns the delete.SUCCESS state', () => {
        const testData = { name: 'Test', _id: '0' };
        const deletedActivity = { name: 'Yoga', _id: '123' };
        const mockPayload = { payload: services, deletedActivity };
        const action = { type: Types.service.delete.SUCCESS, payload: mockPayload };
        const expectedState = {
            loading: false,
            all: {},
            errors: {}
        };

        expect(reducer(undefined, action)).toEqual(expectedState);
    });
});

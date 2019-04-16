import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ActionHelper, getDefaultActions } from '../ActionHelper';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mockAxios = new MockAdapter(axios);

describe('ActionHelper.js', () => {
    const testType = {
        url: 'testUrl',
        create: {
            BEGIN: 'CREATE_TEST_BEGIN',
            SUCCESS: 'CREATE_TEST_SUCCESS'
        },
        filter: {
            BEGIN: 'FILTER_TESTS_BEGIN',
            SUCCESS: 'FILTER_TESTS_SUCCESS'
        },
        get: {
            BEGIN: 'GET_TEST_BEGIN',
            SUCCESS: 'GET_TEST_SUCCESS'
        },
        edit: {
            BEGIN: 'EDIT_TEST_BEGIN',
            SUCCESS: 'EDIT_TEST_SUCCESS'
        },
        delete: {
            BEGIN: 'DELETE_TEST_BEGIN',
            SUCCESS: 'DELETE_TEST_SUCCESS'
        },
        ERROR: 'GET_TEST_ERRORS'
    };

    describe('ActionHelper', () => {
        const actions = getDefaultActions(testType);
        const testData = { name: 'Test', _id: 'testId' };
        const testErrors = { error: 'so many error' };

        const getSuccessActions = type => [{ type: type.BEGIN }, { payload: testData, type: type.SUCCESS }];

        const getErrorActions = type => [{ type: type.BEGIN }, { payload: testErrors, type: testType.ERROR }];

        afterEach(() => {
            mockAxios.reset();
            store.clearActions();
        });

        describe('create', () => {
            it('dispatches success action', async () => {
                mockAxios.onPost(`/api/${testType.url}/`).reply(200, testData);
                const history = [];
                const onSuccess = jest.fn();
                await store.dispatch(actions.create(testData, history, onSuccess));
                const expectedHistory = [`/${testType.url}/${testData._id}`];
                expect(history).toEqual(expectedHistory);
                expect(store.getActions()).toEqual(getSuccessActions(testType.create));
                expect(onSuccess).toBeCalled();
            });

            it('dispatches error action', async () => {
                mockAxios.onPost(`/api/${testType.url}/`).reply(400, testErrors);
                const history = [];
                const onSuccess = jest.fn();
                await store.dispatch(actions.create(null, history, onSuccess));
                expect(history).toEqual([]);
                expect(store.getActions()).toEqual(getErrorActions(testType.create));
                expect(onSuccess).not.toBeCalled();
            });
        });

        describe('filter', () => {
            it('dispatches success action', async () => {
                mockAxios.onPost(`/api/${testType.url}/filter`).reply(200, testData);
                await store.dispatch(actions.filter({}));
                expect(store.getActions()).toEqual(getSuccessActions(testType.filter));
            });

            it('dispatches error action', async () => {
                mockAxios.onPost(`/api/${testType.url}/filter`).reply(400, testErrors);
                await store.dispatch(actions.filter({}));
                expect(store.getActions()).toEqual(getErrorActions(testType.filter));
            });
        });

        describe('get', () => {
            it('dispatches success action', async () => {
                mockAxios.onGet(`/api/${testType.url}/${testData._id}`).reply(200, testData);
                const onFail = jest.fn();
                await store.dispatch(actions.get(testData._id, onFail));
                expect(store.getActions()).toEqual(getSuccessActions(testType.get));
                expect(onFail).not.toBeCalled();
            });

            it('dispatches error action', async () => {
                mockAxios.onGet(`/api/${testType.url}/`).reply(400, testErrors);
                const onFail = jest.fn();
                await store.dispatch(actions.get('', onFail));
                expect(store.getActions()).toEqual(getErrorActions(testType.get));
                expect(onFail).toBeCalled();
            });
        });

        describe('edit', () => {
            it('dispatches success action', async () => {
                mockAxios.onPatch(`/api/${testType.url}/${testData._id}`).reply(200, testData);
                const onSuccess = jest.fn();
                await store.dispatch(actions.edit(testData._id, testData, onSuccess));
                expect(store.getActions()).toEqual(getSuccessActions(testType.edit));
                expect(onSuccess).toBeCalled();
            });

            it('dispatches error action', async () => {
                mockAxios.onPatch(`/api/${testType.url}/`).reply(400, testErrors);
                const onSuccess = jest.fn();
                await store.dispatch(actions.edit('', onSuccess));
                expect(store.getActions()).toEqual(getErrorActions(testType.edit));
                expect(onSuccess).not.toBeCalled();
            });
        });

        describe('delete', () => {
            it('dispatches success action', async () => {
                mockAxios.onDelete(`/api/${testType.url}/${testData._id}`).reply(200, testData);
                const onSuccess = jest.fn();
                await store.dispatch(actions.delete(testData._id, onSuccess));
                expect(store.getActions()).toEqual(getSuccessActions(testType.delete));
                expect(onSuccess).toBeCalled();
            });

            it('dispatches error action', async () => {
                mockAxios.onDelete(`/api/${testType.url}/`).reply(400, testErrors);
                const onSuccess = jest.fn();
                await store.dispatch(actions.delete('', onSuccess));
                expect(store.getActions()).toEqual(getErrorActions(testType.delete));
                expect(onSuccess).not.toBeCalled();
            });
        });
    });
});

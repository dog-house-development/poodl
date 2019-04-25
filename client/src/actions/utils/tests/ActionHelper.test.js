import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getDefaultActions } from '../ActionHelper';

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
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore();
        const mockAxios = new MockAdapter(axios);

        const actions = getDefaultActions(testType);
        const testData = { name: 'Test', _id: 'testId' };
        const testErrors = { error: 'so many error' };

        const setMockAxios = {
            success: (fun, appendToUrl = '') => {
                mockAxios[fun](`/api/${testType.url}/${appendToUrl}`).reply(200, testData);
            },
            fail: (fun, appendToUrl = '') => {
                mockAxios[fun](`/api/${testType.url}/${appendToUrl}`).reply(400, testErrors);
            }
        };

        const getSuccessActions = type => [{ type: type.BEGIN }, { payload: testData, type: type.SUCCESS }];

        const getErrorActions = type => [{ type: type.BEGIN }, { payload: testErrors, type: testType.ERROR }];

        let onSuccess, onFail;

        const expectResult = {
            fail: type => {
                expect(store.getActions()).toEqual(getErrorActions(type));
                expect(onSuccess).not.toBeCalled();
                expect(onFail).toBeCalled();
            },
            success: type => {
                expect(store.getActions()).toEqual(getSuccessActions(type));
                expect(onSuccess).toBeCalled();
                expect(onFail).not.toBeCalled();
            }
        };

        beforeEach(() => {
            onSuccess = jest.fn(res => {
                expect(res.data).toEqual(testData);
            });

            onFail = jest.fn(err => {
                expect(err.response.data).toEqual(testErrors);
            });
        });

        afterEach(() => {
            mockAxios.reset();
            store.clearActions();
        });

        describe('create', () => {
            const createTest = async (successOrFail, expectedHistory) => {
                setMockAxios[successOrFail]('onPost');
                const history = [];
                await store.dispatch(actions.create(testData, history, onSuccess, onFail));
                expect(history).toEqual(expectedHistory);
                expectResult[successOrFail](testType.create);
            };

            it('dispatches success action', async () => {
                await createTest('success', [`/${testType.url}/${testData._id}`]);
            });

            it('dispatches error action', async () => {
                await createTest('fail', []);
            });
        });

        describe('filter', () => {
            const filterTest = async successOrFail => {
                setMockAxios[successOrFail]('onPost', 'filter');
                await store.dispatch(actions.filter({}, onSuccess, onFail));
                expectResult[successOrFail](testType.filter);
            };

            it('dispatches success action', async () => {
                await filterTest('success');
            });

            it('dispatches error action', async () => {
                await filterTest('fail');
            });
        });

        describe('get', () => {
            const getTest = async successOrFail => {
                setMockAxios[successOrFail]('onGet', testData._id);
                await store.dispatch(actions.get(testData._id, onSuccess, onFail));
                expectResult[successOrFail](testType.get);
            };

            it('dispatches success action', async () => {
                await getTest('success');
            });

            it('dispatches error action', async () => {
                await getTest('fail');
            });
        });

        describe('edit', () => {
            const editTest = async successOrFail => {
                setMockAxios[successOrFail]('onPatch', testData._id);
                await store.dispatch(actions.edit(testData._id, testData, onSuccess, onFail));
                expectResult[successOrFail](testType.edit);
            };

            it('dispatches success action', async () => {
                await editTest('success');
            });

            it('dispatches error action', async () => {
                await editTest('fail');
            });
        });

        describe('delete', () => {
            const deleteTest = async successOrFail => {
                setMockAxios[successOrFail]('onDelete', testData._id);
                await store.dispatch(actions.delete(testData._id, onSuccess, onFail));
                expectResult[successOrFail](testType.delete);
            };

            it('dispatches success action', async () => {
                await deleteTest('success');
            });

            it('dispatches error action', async () => {
                await deleteTest('fail');
            });
        });
    });
});

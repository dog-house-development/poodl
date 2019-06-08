import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AuthActions from '../authActions';
import Types from '../types';
import setAuthToken from '../../utils/setAuthToken';

describe('authActions.js', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();
    const mockAxios = new MockAdapter(axios);

    afterEach(() => {
        store.clearActions();
        mockAxios.reset();
    });

    describe('setCurrentAdmin', () => {
        it('returns the correct action', () => {
            const testData = {
                test: 'test'
            };

            store.dispatch(AuthActions.setCurrentAdmin(testData));
            const expectedActions = [{ payload: testData, type: Types.auth.SET_CURRENT_ADMIN }];

            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('loginAdmin', () => {
        const loginResponse = {
            success: true,
            token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYjhjYjQzZDdhMjMxMDAxN2I0YzM0NiIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJzZW5pb3JDZW50ZXJJZCI6IjVjNzVmOTlmZTcxNzlhM2UzNmRkZWU1YiIsImFjY2Vzc0xldmVsIjoiQWRtaW4iLCJpYXQiOjE1NTU2MTQ1NDAsImV4cCI6MTU4NzE3MTQ2Nn0.5nujZcC1jBhUZeg3VZqs63M-RkXPhzkEB6XRFGVxvt0'
        };

        it('dispatches success actions', async () => {
            // Make sure storage and headers have been cleared
            expect(localStorage.getItem('jwtToken')).toEqual(null);
            expect(axios.defaults.headers.common['Authorization']).toEqual(undefined);

            mockAxios.onPost('/api/admins/login').reply(200, loginResponse);

            await store.dispatch(AuthActions.loginAdmin({ test: 'test' }));
            const expectedActions = [
                { type: Types.auth.login.BEGIN },
                {
                    payload: {
                        accessLevel: 'Admin',
                        exp: 1587171466,
                        firstName: 'test',
                        id: '5cb8cb43d7a2310017b4c346',
                        lastName: 'test',
                        seniorCenterId: '5c75f99fe7179a3e36ddee5b'
                    },
                    type: Types.auth.login.SUCCESS
                }
            ];
            const actualActions = store.getActions();
            delete actualActions[1].payload.iat;
            expect(actualActions).toEqual(expectedActions);
            expect(localStorage.getItem('jwtToken')).toEqual(loginResponse.token);
            expect(axios.defaults.headers.common['Authorization']).toEqual(loginResponse.token);

            // Clear headers and storage
            setAuthToken();
            localStorage.clear();
        });

        it('dispatches errors actions', async () => {
            mockAxios.onPost('/api/admins/login').reply(400, { error: 'this is a very big error' });
            await store.dispatch(AuthActions.loginAdmin({}));
            const expectedActions = [
                { type: Types.auth.login.BEGIN },
                { payload: { error: 'this is a very big error' }, type: 'GET_AUTH_ERRORS' }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('logoutAdmin', () => {
        it('dispatches success action', () => {
            const fakeToken = 'fakeToken';
            // Set fake tokens in header and storage
            localStorage.setItem('jwtToken', fakeToken);
            setAuthToken(fakeToken);

            // Make sure fake tokens were set properly
            expect(localStorage.getItem('jwtToken')).toEqual(fakeToken);
            expect(axios.defaults.headers.common['Authorization']).toEqual(fakeToken);

            store.dispatch(AuthActions.logoutAdmin());
            const expectedActions = [{ payload: {}, type: 'LOGOUT_ADMIN_SUCCESS' }];
            expect(store.getActions()).toEqual(expectedActions);

            // Verifiy tokens were cleared from storage and headers
            expect(localStorage.getItem('jwtToken')).toEqual(null);
            expect(axios.defaults.headers.common['Authorization']).toEqual(undefined);
        });
    });
});

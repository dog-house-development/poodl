import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AdminActions from '../adminActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mockAxios = new MockAdapter(axios);

describe('adminActions.js', () => {
    describe('filter', () => {
        it('adds access level to filter', async () => {
            let requestFilter;
            mockAxios.onPost('/api/admins/filter').reply(config => {
                requestFilter = config.data;
                return [200, {}];
            });
            await store.dispatch(AdminActions.filter());
            const expectedFilter = { accessLevel: { $ne: 'Volunteer' } };
            expect(JSON.parse(requestFilter)).toEqual(expectedFilter);
        });
    });
});

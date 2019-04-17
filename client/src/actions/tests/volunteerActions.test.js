import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import VolunteerActions from '../volunteerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mockAxios = new MockAdapter(axios);

describe('volunteerActions.js', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    describe('filter', () => {
        it('adds access level to filter', async () => {
            let requestFilter;
            mockAxios.onPost('/api/admins/filter').reply(config => {
                requestFilter = config.data;
                return [200];
            });
            await store.dispatch(VolunteerActions.filter());
            const expectedFilter = { accessLevel: 'Volunteer' };
            expect(JSON.parse(requestFilter)).toEqual(expectedFilter);
        });
    });

    describe('create', () => {
        it('adds access level to data', async () => {
            let requestData;
            mockAxios.onPost('/api/admins/').reply(config => {
                requestData = config.data;
                return [200];
            });

            await store.dispatch(VolunteerActions.create({}));
            const expectedData = { accessLevel: 'Volunteer' };
            expect(JSON.parse(requestData)).toEqual(expectedData);
        });
    });
});

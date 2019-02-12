import setAuthToken from '../setAuthToken';
import axios from 'axios';

describe('setAuthToken tests', () => {
    it('should set the token if it exists', () => {
        setAuthToken(2);
        expect(axios.defaults.headers.common['Authorization']).toBe(2);
    });

    it('should delete the token if it does not exist', () => {
        setAuthToken();
        expect(axios.defaults.headers.common['Authorization']).toBe(undefined);
    });
});

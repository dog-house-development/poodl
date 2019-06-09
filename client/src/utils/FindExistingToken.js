import jwt_decode from 'jwt-decode';

import store from '../redux/store';
import AuthActions from '../redux/actions/authActions';
import setAuthToken from './setAuthToken';

const findExistingToken = () => {
    if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        setAuthToken(token);
        // Decode token and get admin info and exp
        const decoded = jwt_decode(token);
        // Set admin and isAuthenticated
        store.dispatch(AuthActions.setCurrentAdmin(decoded));
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
            // Logout admin
            store.dispatch(AuthActions.logoutAdmin());
        } else {
            store.dispatch(AuthActions.refreshToken());
        }
    }
};

export default findExistingToken;

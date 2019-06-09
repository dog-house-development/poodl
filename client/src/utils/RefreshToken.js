import store from '../redux/store';
import AuthActions from '../redux/actions/authActions';

/**
 * Manages refreshing the jwt and logging out when inactive.
 * Every 2 hours it refresh the json web token.
 * Every 5 hours it checks if you interacted, if so it resets a timeout
 * that will log you out in 10 hours.
 * The token from the server expires in 11 hours.
 */
const refreshToken = () => {
    let shouldRefresh = false;

    const jwtRefresh = () => {
        if (localStorage.getItem('jwtToken')) {
            store.dispatch(AuthActions.refreshToken());
        }
    };

    const logout = () => {
        if (localStorage.getItem('jwtToken') && !shouldRefresh) {
            store.dispatch(AuthActions.logoutAdmin());
        }
    };

    let logoutInterval;
    const hours = 3600000; // 1 hour in milliseconds

    const resetLogoutInterval = () => {
        clearInterval(logoutInterval);
        logoutInterval = setInterval(logout, 10 * hours);
    };

    resetLogoutInterval();

    const logoutRefresh = () => {
        if (shouldRefresh) {
            shouldRefresh = false;
            resetLogoutInterval();
        }
    };

    setInterval(jwtRefresh, 2 * hours);
    setInterval(logoutRefresh, 5 * hours);

    const interact = () => {
        if (!shouldRefresh) {
            shouldRefresh = true;
        }
    };

    window.onmousemove = interact;
    window.onmousedown = interact;
};

export default refreshToken;

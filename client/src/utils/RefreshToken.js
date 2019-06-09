import store from '../redux/store';
import AuthActions from '../redux/actions/authActions';

// Function to manage refreshing the jwt and logging out when inactive.
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

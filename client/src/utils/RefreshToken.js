import store from '../redux/store';
import AuthActions from '../redux/actions/authActions';

// Function to manage refreshing the jwt and logging out when inactive.
const refreshToken = () => {
    console.log('refreshToken');
    let shouldRefresh = false;

    let time = 0;
    setInterval(() => {
        console.log(time, 'should refresh', shouldRefresh);
        time++;
    }, 1000);

    const jwtRefresh = () => {
        console.log('should refresh?');
        if (localStorage.getItem('jwtToken') && shouldRefresh) {
            console.log('refresh jwt');
            store.dispatch(AuthActions.refreshToken());
        }
    };

    const logout = () => {
        if (localStorage.getItem('jwtToken') && !shouldRefresh) {
            // console.log('logout');
            console.log('timed out because of inactivity after 10 seconds');
            store.dispatch(AuthActions.logoutAdmin());
        }
    };

    let logoutInterval;
    const seconds = 1000;

    const resetLogoutInterval = () => {
        console.log('reset logout interval');
        clearInterval(logoutInterval);
        logoutInterval = setInterval(logout, 10 * seconds);
    };

    resetLogoutInterval();

    const logoutRefresh = () => {
        if (shouldRefresh) {
            shouldRefresh = false;
            resetLogoutInterval();
        }
    };

    setInterval(jwtRefresh, 5 * seconds);
    setInterval(logoutRefresh, 1 * seconds);

    const interact = () => {
        if (!shouldRefresh) {
            shouldRefresh = true;
        }
    };

    window.onmousemove = interact;
    window.onmousedown = interact;
    // window.onchange = interact;
};

export default refreshToken;

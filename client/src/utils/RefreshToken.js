import store from '../store';
import AuthActions from '../actions/authActions';
import moment from 'moment';

// Function to manage refreshing the 
const refreshToken = () => {
    console.log('refreshToken');
    let shouldRefresh = false;

    let time = 0;
    setInterval(() => {
        console.log(time, 'should refresh', shouldRefresh);
        time++;
    }, 1000);

    const jwtRefresh = () => {
        if (localStorage.getItem('jwtToken')) {
            console.log('refresh jwt');
        }
    };

    const logout = () => {
        if (localStorage.getItem('jwtToken')) {
            console.log('logout');
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
        if (localStorage.getItem('jwtToken')) {
            if (shouldRefresh) {
                shouldRefresh = false;
                resetLogoutInterval();
            }
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
    // window.onchange = interact;
};

export default refreshToken;

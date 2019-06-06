import store from '../store';
import AuthActions from '../actions/authActions';
import moment from 'moment';

const refreshToken = () => {
    console.log('refreshToken');
    let timeInteracted, logoutTimeout;
    // const minutes = 60000;
    const seconds = 1000;
    // if (localStorage.timeInteracted) {
    //     timeInteracted = localStorage.timeInteracted;
    // } else {
    // }
    let time = 0;
    timeInteracted = Date.now();
    setInterval(() => {
        console.log(time);
        time++;
    }, 1000);

    const logout = () => {
        console.log('logout');
        if (localStorage.getItem('jwtToken')) {
            store.dispatch(AuthActions.logoutAdmin());
        }
    };

    const getLogoutTimeout = () => {
        console.log('getLogoutTimeout');
        return setTimeout(logout, 20 * seconds);
    };

    // logoutTimeout = getLogoutTimeout();

    const refresh = () => {
        // console.log('time interacted', timeInteracted + 10 * seconds);
        // console.log('now', Date.now());
        // If you interacted more than 5 seconds ago
        // console.log('date now', moment());
        // console.log(moment(timeInteracted));
        if (Date.now() > timeInteracted + 10 * seconds && localStorage.jwtToken) {
            console.log('hello');
            localStorage.timeInteracted = timeInteracted = Date.now();
            console.log('expire at ', time + 20);
            // api call to refresh token

            clearTimeout(logoutTimeout);
            logoutTimeout = getLogoutTimeout();
        }
    };

    window.onmousemove = refresh;
    window.onchange = refresh;
};

export default refreshToken;

import store from '../store';
import AuthActions from '../actions/authActions';
import moment from 'moment';

const refreshToken = () => {
    console.log('refreshToken');
    let shouldRefresh = false;

    let time = 0;
    setInterval(() => {
        console.log(time, 'should refresh', shouldRefresh);
        time++;
    }, 1000);

    const refresh = () => {
        if (localStorage.getItem('jwtToken')) {
            if (shouldRefresh) {
                console.log('refresh jwt');
                shouldRefresh = false;
            } else {
                console.log('logout');
                store.dispatch(AuthActions.logoutAdmin());
                shouldRefresh = true;
            }
        }
    };

    const seconds = 1000;

    setInterval(refresh, 10 * seconds);

    const interact = () => {
        if (!shouldRefresh) {
            shouldRefresh = true;
        }
    };

    window.onmousemove = interact;
    // window.onchange = interact;
};

export default refreshToken;

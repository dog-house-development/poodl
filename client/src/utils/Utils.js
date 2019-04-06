import moment from 'moment';

export default {
    formatDateRange: (startDate, endDate, format) => {
        if (moment(startDate).format('MM/DD/YYYY') === moment(endDate).format('MM/DD/YYYY')) {
            return moment(startDate).format('h:mma') + ' - ' + moment(endDate).format('h:mma');
        }
        return moment(startDate).format('h:mma M/D/YY') + ' - ' + moment(endDate).format('h:mma M/D/YY');
    },

    setLocalStorage: (key, value) => {
        window.localStorage.setItem(key, value);
    },

    getLocalStorage: key => window.localStorage.getItem(key),

    removeLocalStorage: key => {
        window.localStorage.removeItem(key);
    }
};

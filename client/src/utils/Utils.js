import moment from 'moment';
import _ from 'lodash';

const Utils = {
    formatDateRange: (startDate, endDate, format) => {
        if (moment(startDate).format('MM/DD/YYYY') === moment(endDate).format('MM/DD/YYYY')) {
            return moment(startDate).format('h:mma') + ' - ' + moment(endDate).format('h:mma');
        }
        return moment(startDate).format('h:mma M/D/YY') + ' - ' + moment(endDate).format('h:mma M/D/YY');
    },

    searchObject: (param, data) =>
        _.reduce(
            _.split(param, ' '),
            (result, word) => {
                return new RegExp(_.escapeRegExp(word), 'i').test(_.values(data)) && result;
            },
            true
        ),

    searchCollection: (param, data) =>
        _.filter(data, value => {
            let valueToTest = _.clone(value);
            _.remove(valueToTest, 'key');
            return Utils.searchObject(param, valueToTest);
        }),

    setUrlParameter: (key, value, history) => {
        history.push({ search: `?${key}=${value}` });
    },

    getUrlParameter: (key, search) => {
        key = key.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        let results = new RegExp('[\\?&]' + key + '=([^&#]*)').exec(search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
};

export default Utils;

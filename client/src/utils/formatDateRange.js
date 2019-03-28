import moment from 'moment';

export default function(startDate, endDate, format) {
    if (moment(startDate).format('MM/DD/YYYY') === moment(endDate).format('MM/DD/YYYY')) {
        return moment(startDate).format('h:mma') + ' - ' + moment(endDate).format('h:mma');
    }
    return moment(startDate).format('h:mma M/D/YY') + ' - ' + moment(endDate).format('h:mma M/D/YY');
}

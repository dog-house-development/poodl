const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : '';
    data.time = !isEmpty(data.time) ? data.time : '';
    data.duration = !isEmpty(data.duration) ? data.duration : '';
    data.date = !isEmpty(data.date) ? data.date : '';
    data.admins = !isEmpty(data.admins) ? data.admins : '';
    data.volunteers = !isEmpty(data.volunteers) ? data.volunteers : '';
    data.members = !isEmpty(data.members) ? data.members : '';
    data.seniorCenter = !isEmpty(data.seniorCenter) ? data.seniorCenter : '';
    data.maxCapacity = !isEmpty(data.maxCapacity) ? data.maxCapacity : '';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
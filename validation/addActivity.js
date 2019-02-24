const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : '';
    data.times = !isEmpty(data.times) ? data.times : '';
    data.dates = !isEmpty(data.dates) ? data.dates : '';
    data.admins = !isEmpty(data.admins) ? data.admins : '';
    data.volunteers = !isEmpty(data.volunteers) ? data.volunteers : '';
    data.members = !isEmpty(data.members) ? data.members : '';
    data.seniorCenter = !isEmpty(data.seniorCenter) ? data.seniorCenter : '';

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    // Times checks
    if (Validator.isEmpty(data.times)) {
        errors.times = 'Times field is required';
    }

    //Dates check
    if (Validator.isEmpty(data.dates)) {
        errors.dates = 'Dates field is required';
    }

    // admins checks
    if (Validator.isEmpty(data.admins)) {
        errors.admins = 'Admins is required';
    }

    //volunteers check
    if (Validator.isEmpty(data.volunteers)) {
        errors.volunteers = 'Volunteers field is required';
    }

    //members check
    if (Validator.isEmpty(data.members)) {
        errors.members = 'Members field is required';
    }

    //seniorCenter check
    if (Validator.isEmpty(data.seniorCenter)) {
        errors.seniorCenter = 'SeniorCenter field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

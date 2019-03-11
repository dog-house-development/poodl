const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.seniorCenter = !isEmpty(data.seniorCenter) ? data.seniorCenter : '';

    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name field is required';
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name field is required';
    }

    //SC check
    if (Validator.isEmpty(data.seniorCenter)) {
        errors.seniorCenter = 'Senior Center field is required';
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.seniorCenter = !isEmpty(data.seniorCenter) ? data.seniorCenter : '';
    data.superAdmin = !isEmpty(data.superAdmin) ? data.superAdmin : '';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

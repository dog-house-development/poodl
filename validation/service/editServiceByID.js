const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : '';
    data.seniorCenterId = !isEmpty(data.seniorCenterId) ? data.seniorCenterId : '';
    data.memberId = !isEmpty(data.memberId) ? data.memberId : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

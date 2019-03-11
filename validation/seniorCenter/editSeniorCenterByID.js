const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.operationHours = !isEmpty(data.operationHours) ? data.operationHours : '';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

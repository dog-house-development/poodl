const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (data.page == null) {
        errors.page = 'Page field is required';
    }
    if (data.pageSize == null) {
        errors.pageSize = 'PageSize field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

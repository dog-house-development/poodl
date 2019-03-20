const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterAdmin(admin) {
    let errors = {};

    if (admin.password !== admin.password2) {
        errors.password2 = 'Passwords must match';
    }

    if (!Validator.isLength(admin.password, { min: 6 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

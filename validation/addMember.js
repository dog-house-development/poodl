const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.membershipDate = !isEmpty(data.membershipDate) ? data.membershipDate : '';
    data.renewalDate = !isEmpty(data.renewalDate) ? data.renewalDate : '';
    data.mealPreference = !isEmpty(data.mealPreference) ? data.mealPreference : '';

    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name field is required';
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name field is required';
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // address checks
    if (Validator.isEmpty(data.address)) {
        errors.address = 'Address field is required';
    }

    if (Validator.isEmpty(data.membershipDate)) {
        errors.membershipDate = 'Membership date field is required';
    }

    if (Validator.isEmpty(data.renewalDate)) {
        errors.renewalDate = 'Renewal date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

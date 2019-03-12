const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.houseMaintenanceAndRepairs = !isEmpty(data.houseMaintenanceAndRepairs)
        ? data.houseMaintenanceAndRepairs
        : 'None';
    data.groundMaintenance = !isEmpty(data.groundMaintenance) ? data.groundMaintenance : 'None';
    data.clericalAssistance = !isEmpty(data.clericalAssistance) ? data.clericalAssistance : 'None';
    data.nutritionProgram = !isEmpty(data.nutritionProgram) ? data.nutritionProgram : 'None';
    data.specialEventsAndFundRaising = !isEmpty(data.specialEventsAndFundRaising)
        ? data.specialEventsAndFundRaising
        : 'None';
    data.interpretingTeachingClassesOrWorkshops = !isEmpty(data.interpretingTeachingClassesOrWorkshops)
        ? data.interpretingTeachingClassesOrWorkshops
        : 'None';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

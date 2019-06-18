const ApiHelper = require('./utils/apiHelper');
const { restrictAdminVolunteer } = require('./utils/ExpressMiddleware');

const router = require('express').Router();
const SeniorCenter = require('mongoose').model('SeniorCenter');

// @route POST api/seniorCenters/
ApiHelper.create(router, SeniorCenter, restrictAdminVolunteer);

// @route POST api/seniorCenters/filter
ApiHelper.filter(router, SeniorCenter, restrictAdminVolunteer);

// @route GET api/seniorCenters/:id
ApiHelper.get(router, SeniorCenter);

// @route PATCH api/seniorCenters/:id
ApiHelper.edit(router, SeniorCenter, restrictAdminVolunteer);

// @router DELETE api/seniorCenters/:id
ApiHelper.delete(router, SeniorCenter, restrictAdminVolunteer);

module.exports = router;

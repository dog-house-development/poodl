const ApiHelper = require('./utils/apiHelper');
const { restrictAdminVolunteer } = require('./utils/ExpressMiddleware');

const router = require('express').Router();
const modelName = 'SeniorCenter';

// @route POST api/seniorCenters/
ApiHelper.create(router, modelName, restrictAdminVolunteer());

// @route POST api/seniorCenters/filter
ApiHelper.filter(router, modelName, restrictAdminVolunteer());

// @route GET api/seniorCenters/:id
ApiHelper.get(router, modelName);

// @route PATCH api/seniorCenters/:id
ApiHelper.edit(router, modelName, restrictAdminVolunteer());

// @router DELETE api/seniorCenters/:id
ApiHelper.delete(router, modelName, restrictAdminVolunteer());

module.exports = router;

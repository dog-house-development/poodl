const ApiHelper = require('./utils/apiHelper');

const router = require('express').Router();
const SeniorCenter = require('mongoose').model('SeniorCenter');

// @route POST api/seniorCenters/
ApiHelper.create(router, SeniorCenter, ['Admin', 'Volunteer']);

// @route POST api/seniorCenters/filter
ApiHelper.filter(router, SeniorCenter, ['Admin', 'Volunteer']);

// @route GET api/seniorCenters/:id
ApiHelper.get(router, SeniorCenter, ['Admin', 'Volunteer']);

// @route PATCH api/seniorCenters/:id
ApiHelper.edit(router, SeniorCenter, ['Admin', 'Volunteer']);

// @router DELETE api/seniorCenters/:id
ApiHelper.delete(router, SeniorCenter, ['Admin', 'Volunteer']);

module.exports = router;

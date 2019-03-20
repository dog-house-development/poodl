const ApiHelper = require('./utils/apiHelper');

const router = require('express').Router();
const SeniorCenter = require('mongoose').model('SeniorCenter');

// @route POST api/seniorCenters/
ApiHelper.create(router, SeniorCenter);

// @route POST api/seniorCenters/filter
ApiHelper.filter(router, SeniorCenter);

// @route GET api/seniorCenters/:id
ApiHelper.get(router, SeniorCenter);

// @route PATCH api/seniorCenters/:id
ApiHelper.edit(router, SeniorCenter);

// @router DELETE api/seniorCenters/:id
ApiHelper.delete(router, SeniorCenter);

module.exports = router;

const router = require('express').Router();
const Service = require('mongoose').model('Service');

const { addSeniorCenterIdToRequest } = require('./utils/ExpressMiddleware');
const ApiHelper = require('./utils/apiHelper');

// @route POST api/services/
ApiHelper.create(router, Service);

// @route POST api/services/filter
ApiHelper.filter(router, Service, addSeniorCenterIdToRequest);

// @route GET api/services/:id
ApiHelper.get(router, Service);

// @route PATCH api/services/:id
ApiHelper.edit(router, Service);

// @router DELETE api/services/:id
ApiHelper.delete(router, Service);

module.exports = router;

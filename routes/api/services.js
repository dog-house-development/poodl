const router = require('express').Router();

const { addSeniorCenterIdToRequest } = require('./utils/ExpressMiddleware');
const ApiHelper = require('./utils/apiHelper');
const modelName = 'Service';

// @route POST api/services/
ApiHelper.create(router, modelName);

// @route POST api/services/filter
ApiHelper.filter(router, modelName, addSeniorCenterIdToRequest);

// @route GET api/services/:id
ApiHelper.get(router, modelName);

// @route PATCH api/services/:id
ApiHelper.edit(router, modelName);

// @router DELETE api/services/:id
ApiHelper.delete(router, modelName);

module.exports = router;

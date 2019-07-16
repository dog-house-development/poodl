const router = require('express').Router();
const modelName = 'Activity';
const ApiHelper = require('./utils/apiHelper');
const { addSeniorCenterIdToRequest } = require('./utils/ExpressMiddleware');

// @route POST api/activities/
ApiHelper.create(router, modelName);

// @route POST api/activities/filter
ApiHelper.filter(router, modelName, addSeniorCenterIdToRequest);

// @route GET api/activities/:id
ApiHelper.get(router, modelName);

// @route PATCH api/activities/:id
ApiHelper.edit(router, modelName);

// @router DELETE api/activities/:id
ApiHelper.delete(router, modelName);

module.exports = router;

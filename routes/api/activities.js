const router = require('express').Router();
const Activity = require('mongoose').model('Activity');

const ApiHelper = require('./utils/apiHelper');
const { addSeniorCenterIdToRequest } = require('./utils/ExpressMiddleware');

// @route POST api/activities/
ApiHelper.create(router, Activity);

// @route POST api/activities/filter
ApiHelper.filter(router, Activity, addSeniorCenterIdToRequest);

// @route GET api/activities/:id
ApiHelper.get(router, Activity);

// @route PATCH api/activities/:id
ApiHelper.edit(router, Activity);

// @router DELETE api/activities/:id
ApiHelper.delete(router, Activity);

module.exports = router;

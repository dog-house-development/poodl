const ApiHelper = require('./utils/apiHelper');

const router = require('express').Router();
const Activity = require('mongoose').model('Activity');

// @route POST api/activities/
ApiHelper.create(router, Activity);

// @route POST api/activities/filter
ApiHelper.filter(router, Activity);

// @route GET api/activities/:id
ApiHelper.get(router, Activity);

// @route PATCH api/activities/:id
ApiHelper.edit(router, Activity);

// @router DELETE api/activities/:id
ApiHelper.delete(router, Activity);

module.exports = router;

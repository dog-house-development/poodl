const ApiHelper = require('./utils/apiHelper');

const router = require('express').Router();
const Member = require('mongoose').model('Member');

// @route POST api/members/
ApiHelper.create(router, Member);

// @route POST api/members/filter
ApiHelper.filter(router, Member);

// @route GET api/members/:id
ApiHelper.get(router, Member);

// @route PATCH api/members/:id
ApiHelper.edit(router, Member);

// @router DELETE api/members/:id
ApiHelper.delete(router, Member);

module.exports = router;

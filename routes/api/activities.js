const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/addActivity');
const invalid = require('../../utils/validation');

//Load Activity models
const Activity = require('../../models/Activity');

//@router DELETE api/activities/delete/:id
//should delete an activity based on the id
router.delete('/delete/:id', (req, res) => {
    Activity.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//@route GET api/activities/get
//should return all activites
router.get('/get', (req, res) => {
    Activity.find((err, activities) => {
        if (err) return res.json({ sucess: false, error: err });
        return res.json({ success: true, data: activities });
    });
});

//@route GET api/activities/get/:id
//should return activity by id
router.get('/get/:id', (req, res, next) => {
    Activity.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return next(err);
        return res.json(post);
    });
});

// @route POST api/activities/filter
// should return filtered results from json
router.post('/filter', (req, res) => {
    Activity.find(res.body, (err, activities) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: activities });
    });
});

// @route POST api/activities/add
// @desc add a activity
router.post('/add', (req, res) => {
    const activity = new Activity(req.body);
    if (invalid(activity, res)) return;

    new Activity(req.body)
        .save()
        .then(Activity => res.json(Activity))
        .catch(err => res.status(400).json(err));
});

module.exports = router;

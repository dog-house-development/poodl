const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const invalid = require('../../utility/validation');
const validateEditInputByID = require('../../validation/editActivityByID');
const validateFilterInput = require('../../validation/activityFilter');

//Load Utilities
const jsonBuilder = require('../../utility/stringConverter');

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

//@route POST api/activities/get/:id
//should edit something by id
router.post('/edit/:id', (req, res) => {
    const { errors, isValid } = validateEditInputByID(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Activity.findOne({
        _id: req.params.id
    }).then(activity => {
        if (!activity) {
            return res.status(400).json({ _id: 'Activity does not exist' });
        } else {
            if (req.body.name != '') {
                activity.name = req.body.name;
            }
            if (req.body.time != '') {
                activity.time = req.body.time;
            }
            if (req.body.duration != '') {
                activity.duration = req.body.duration;
            }
            if (req.body.date != '') {
                activity.date = req.body.date;
            }
            if (req.body.admins != '') {
                activity.admins = req.body.admins;
            }
            if (req.body.volunteers != '') {
                activity.volunteers = req.body.volunteers;
            }
            if (req.body.members != '') {
                activity.members = req.body.members;
            }
            if (req.body.seniorCenter != '') {
                activity.seniorCenter = req.body.seniorCenter;
            }
            if (req.body.maxCapacity != '') {
                activity.maxCapacity = req.body.maxCapacity;
            }
        }
        activity
            .save()
            .then(Activity => res.json(Activity))
            .catch(err => console.log(err));
    });
});

// @route POST api/activities/filter
// should return filtered results from json
router.post('/filter', (req, res) => {
    const request = jsonBuilder(req.body);

    Activity.find(request[0], (err, activities) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: activities });
    })
        .skip(request[2] * request[1]) // paging function
        .limit(request[2]);
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

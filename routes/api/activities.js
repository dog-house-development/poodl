const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/addActivity');
const validateEditInputByID = require('../../validation/editActivityByID');
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
    Activity.find(res.body, (err, activities) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: activities });
    });
});

// @route POST api/activities/add
// @desc add a activity
router.post('/add', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Activity.findOne({ name: req.body.name }).then(activity => {
        if (activity) {
            return res.status(400).json({ name: 'Activity already exists' });
        } else {
            const newActivity = new Activity({
                name: req.body.name,
                time: req.body.time,
                duration: req.body.duration,
                date: req.body.date,
                admins: req.body.admins,
                volunteers: req.body.volunteers,
                members: req.body.members,
                seniorCenter: req.body.seniorCenter,
                maxCapacity: req.body.maxCapacity
            });

            newActivity
                .save()
                .then(Activity => res.json(Activity))
                .catch(err => console.log(err));
        }
    });
});

module.exports = router;

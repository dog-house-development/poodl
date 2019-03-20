const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Activity model
const Activity = require('mongoose').model('Activity');

//@router DELETE api/activities/delete/:id
//should delete an activity based on the id
router.delete('/delete/:id', (req, res) => {
    Activity.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
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
    Activity.findById(req.params, (err, activity) => {
        console.log(err);
        console.log(activity);

        if (req.body._id) {
            delete req.body._id;
        }

        for (let field in req.body) {
            activity[field] = req.body[field];
        }

        activity
            .save()
            .then(activity => res.json(activity))
            .catch(err => {
                console.log(err);
                return res.status(400).json(err);
            });
    });
});

// @route POST api/activities/filter
// should return filtered results from json
router.post('/filter', (req, res) => {
    Activity.find(req.body, (err, activities) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: activities });
    });
});

// @route POST api/activities/add
// @desc add a activity
router.post('/add', (req, res) => {
    new Activity(req.body)
        .save()
        .then(activity => res.json(activity))
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });
});

module.exports = router;

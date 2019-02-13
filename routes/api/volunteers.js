const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/addVolunteer');

// Load Volunteer model
const Volunteer = require('../../models/Volunteer');

// @route DELETE api/volunteers/delete
// should delete a specified volunteer
//CANNOT TEST LIKE OTHER DELETE WILL DO IN TICKET SOON
router.delete('/delete/:id', (req, res) => {
    Volunteer.findByIdAndRemove({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// @route POST api/volunteers/add
// should add a new Volunteer
router.post('/add', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Volunteer.findOne({ email: req.body.email }).then(volunteer => {
        if (volunteer) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newVolunteer = new Volunteer({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });

            newVolunteer
                .save()
                .then(volunteer => res.json(volunteer))
                .catch(err => console.log(err));
        }
    });
});

// @route GET api/volunteers/get/:id
// should return specified volunteer
router.get('/get/:id', (req, res) => {
    Volunteer.findOne({ _id: reqparams.id }, (err, post) => {
        if (err) return next(err);
        return res.json(post);
    });
});

// @route GET api/volunteers/get
// should return all volunteers
router.get('/get', (req, res) => {
    Volunteer.find((err, volunteers) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: volunteers });
    });
});

module.exports = router;

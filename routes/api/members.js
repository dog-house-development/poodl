const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Member model
const Member = require('../../models/Member');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route DELETE api/members/delete/:id
// should delete specified member by ID
router.delete('/delete/:id', (req, res) => {
    Member.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// @route GET api/members/get/:id
// should return specified member by ID
router.get('/get/:id', (req, res) => {
    Member.findOne({ _id: req.params.id }, (err, member) => {
        if (err) return next(err);
        return res.json(member);
    });
});

// @route GET api/members/get
// should return all Members
router.get('/get', (req, res) => {
    Member.find((err, members) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: members });
    });
});

// Load input validation
const validateRegisterInput = require('../../validation/addMember');

router.post('/add', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Member.findOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(members => {
        if (members) {
            return res.status(400).json({ email: 'Member already exists' });
        } else {
            const newMember = new Member({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                address: req.body.address,
                seniorCenter: req.body.seniorCenter,
                membershipDate: req.body.membershipDate,
                renewalDate: req.body.renewalDate,
                specialDiet: req.body.specialDiet,
                medicalIssues: req.body.medicalIssues,
                disabilities: req.body.disabilities,
                mealPreference: req.body.mealPreference
            });

            newMember
                .save()
                .then(Member => res.json(Member))
                .catch(err => console.log(err));
        }
    });
});

module.exports = router;

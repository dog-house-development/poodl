const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Member model
const Member = require('../../models/Member');

<<<<<<< HEAD
// @route GET api/member/get
=======
// @route GET api/members/get
>>>>>>> 504344639b258bf17b314385011e411ee1d002eb
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

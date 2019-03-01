const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Member model
const Member = require('../../models/Member');

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

const validateEditInput = require('../../validation/editMember');
// @route POST api/members/edit
//should edit specified member by first and last name
router.post('/edit', (req, res) => {
    const { errors, isValid } = validateEditInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Member.findOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(members => {
        if (!members) {
            return res.status(400).json({ firstName: 'Member does not exist' });
        } else {
            if (req.body.email != '') {
                members.email = req.body.email;
            }
            if (req.body.seniorCenter != '') {
                members.seniorCenter = req.body.seniorCenter;
            }
            if (req.body.address != '') {
                members.address = req.body.address;
            }
            if (req.body.membershipDate != '') {
                members.membershipDate = req.body.membershipDate;
            }
            if (req.body.renewalDate != '') {
                members.renewalDate = req.body.renewalDate;
            }
            if (req.body.specialDiet != '') {
                members.specialDiet = req.body.specialDiet;
            }
            if (req.body.medicalIssues != '') {
                members.medicalIssues = req.body.medicalIssues;
            }
            if (req.body.disabilities != '') {
                members.disabilities = req.body.disabilities;
            }
            if (req.body.mealPreference != '') {
                members.mealPreference = req.body.mealPreference;
            }

            members
                .save()
                .then(Member => res.json(Member))
                .catch(err => console.log(err));
        }
    });
});

//validator is here just for the purpose of setting all the values to '' probably a better way but this is what I want to do
const validateEditInputByID = require('../../validation/editMemberByID');

// @route POST api/members/edit/:id
//should edit specified member by first and last name
router.post('/edit/:id', (req, res) => {
    const { errors, isValid } = validateEditInputByID(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Member.findOne({
        _id: req.params.id
    }).then(members => {
        if (!members) {
            return res.status(400).json({ firstName: 'Member does not exist' });
        } else {
            if (req.body.email != '') {
                members.email = req.body.email;
            }
            if (req.body.seniorCenter != '') {
                members.seniorCenter = req.body.seniorCenter;
            }
            if (req.body.address != '') {
                members.address = req.body.address;
            }
            if (req.body.membershipDate != '') {
                members.membershipDate = req.body.membershipDate;
            }
            if (req.body.renewalDate != '') {
                members.renewalDate = req.body.renewalDate;
            }
            if (req.body.specialDiet != '') {
                members.specialDiet = req.body.specialDiet;
            }
            if (req.body.medicalIssues != '') {
                members.medicalIssues = req.body.medicalIssues;
            }
            if (req.body.disabilities != '') {
                members.disabilities = req.body.disabilities;
            }
            if (req.body.mealPreference != '') {
                members.mealPreference = req.body.mealPreference;
            }

            members
                .save()
                .then(Member => res.json(Member))
                .catch(err => console.log(err));
        }
    });
});

// Load edit inout validation
const validateEditInput = require('../../validation/editMember');

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

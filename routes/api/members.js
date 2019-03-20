const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Member model
const Member = require('../../models/Member');

//import utilities
const jsonBuilder = require('../../utility/stringConverter');

//Validation
const validateEditInput = require('../../validation/editMember');
//validator is here just for the purpose of setting all the values to '' probably a better way but this is what I want to do
const validateEditInputByID = require('../../validation/editMemberByID');
const validateRegisterInput = require('../../validation/addMember');
const validateFilterInput = require('../../validation/memberFilter');

// @route DELETE api/members/delete/:id
// should delete specified member by ID
router.delete('/delete/:id', (req, res) => {
    Member.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// @route GET api/members/get/:id
// should return specific member
router.get('/get/:id', (req, res) => {
    Member.findById(req.params.id, (err, member) => {
        if (err) return next(err);
        return res.json(member);
    });
});

// @route GET api/members/get
// should return all members
router.get('/get', (req, res) => {
    Member.find((err, members) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: members });
    });
});

//@route POST api/members/get
//should return members by ids from list
//takes json _id:[]
router.post('/get', (req, res) => {
    Member.find({ _id: req.body._id }, (err, members) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(members);
    });
});

// @route POST api/members/filter
//should filter members and return ones that you want. Builds up a query
router.post('/filter', (req, res) => {
    const request = jsonBuilder(req.body);
    Member.find(request[0], (err, members) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: members });
    })
        .skip(request[2] * request[1]) // paging function
        .limit(request[2]);
});

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
            if (req.body.birthDate != '') {
                members.email = req.body.email;
            }
            if (req.body.seniorCenterId != '') {
                members.seniorCenterId = req.body.seniorCenterId;
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
                .then(member => res.json(member))
                .catch(err => console.log(err));
        }
    });
});

// @route PATCH api/members/edit/:id
//should edit specified member by id
router.patch('/edit/:id', (req, res) => {
    Member.findById(req.params.id, (err, member) => {
        if (req.body._id) {
            delete req.body._id;
        }
        for (let field in req.body) {
            member[field] = req.body[field];
        }
        member
            .save()
            .then(member => res.json(member))
            .catch(err => console.log(err));
    });
});

router.post('/add', (req, res) => {
    const newMember = new Member(req.body);
    error = newMember.validateSync();
    newMember
        .save()
        .then(member => res.json(member))
        .catch(err => console.log(err));
});

module.exports = router;

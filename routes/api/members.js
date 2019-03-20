const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Member model
const Member = require('mongoose').model('Member');

// @route DELETE api/members/delete/:id
// should delete specified member by ID
router.delete('/delete/:id', (req, res) => {
    Member.findByIdAndDelete(req.params.id, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// @route GET api/members/get/:id
// should return specific members
router.get('/get/:id', (req, res) => {
    Member.findById(req.params.id, (err, member) => {
        if (err) return next(err);
        return res.json(member);
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
    Member.find(req.body, (err, members) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: members });
    });
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
            return res.status(400).json({ _id: 'Member does not exist' });
        } else {
            if (req.body.email != '') {
                members.email = req.body.email;
            }
            if (req.body.birthDate != '') {
                members.birthDate = req.body.birthDate;
            }
            if (req.body.phoneNumber != '') {
                members.phoneNumber = req.body.phoneNumber;
            }
            if (req.body.emergencyContact != '') {
                members.emergencyContact = req.body.emergencyContact;
            }
            if (req.body.memberisNewOrRenewal != '') {
                members.memberisNewOrRenewal = req.body.memberisNewOrRenewal;
            }
            if (req.body.formOfPayment != '') {
                members.formOfPayment = req.body.formOfPayment;
            }
            if (req.body.bankCheckNumber != '') {
                members.bankCheckNumber = req.body.bankCheckNumber;
            }
            if (req.body.includedInEstatePlans != '') {
                members.includedInEstatePlans = req.body.includedInEstatePlans;
            }
            if (req.body.wantsEstateInfo != '') {
                members.wantsEstateInfo = req.body.wantsEstateInfo;
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

            //Demographic info
            if (req.body.race != '') {
                members.race = req.body.race;
            }
            if (req.body.ethnicity != '') {
                members.ethnicity = req.body.ethnicity;
            }
            if (req.body.numberInHousehold != '') {
                members.numberInHousehold = req.body.numberInHousehold;
            }
            if (req.body.isPersonCaregiver != '') {
                members.isPersonCaregiver = req.body.isPersonCaregiver;
            }
            if (req.body.monthlyIncome != '') {
                members.monthlyIncome = req.body.monthlyIncome;
            }
            if (req.body.isDisabled != '') {
                members.isDisabled = req.body.isDisabled;
            }
            if (req.body.isVeteran != '') {
                members.isVeteran = req.body.isVeteran;
            }
            if (req.body.isSpouse60 != '') {
                members.isSpouse60 = req.body.isSpouse60;
            }
            if (req.body.isDisabled60 != '') {
                members.isDisabled60 = req.body.isDisabled60;
            }
            if (req.body.caregiver != '') {
                members.caregiver = req.body.caregiver;
            }
            if (req.body.grandparent != '') {
                members.grandparent = req.body.grandparent;
            }
            if (req.body.needsAADL != '') {
                members.needsAADL = req.body.needsAADL;
            }
            if (req.body.needsIADL != '') {
                members.needsIADL = req.body.needsIADL;
            }

            members
                .save()
                .then(Member => res.json(Member))
                .catch(err => console.log(err));
        }
    });
});

router.post('/add', (req, res) => {
    const newMember = new Member(req.body);
    error = newMember.validateSync();
    newMember
        .save()
        .then(Member => res.json(Member))
        .catch(err => console.log(err));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Member model
const Member = require("../../models/Member");

// Load input validation
const validateRegisterInput = require("../../validation/addMember");

router.post("/add", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Member.findOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then(members => {
    if (members) {
      return res.status(400).json({ email: "Member already exists" });
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

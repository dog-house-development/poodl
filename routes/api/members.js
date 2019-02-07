const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Member model
const Member = require("../../models/Member");

// @route GET api/Member/get
// should return all Members
router.get("/get", (req, res) => {
  Member.find((err, members) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: members });
  });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
  }
});

module.exports = router;

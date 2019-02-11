const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Volunteer model
const Volunteer = require('../../models/Volunteer');

// @route GET api/volunteers/get
// should return all volunteers
router.get('/get', (req, res) => {
    Volunteer.find((err, volunteers) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: volunteers });
    });
});

module.exports = router;

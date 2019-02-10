const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Volunteer model
const volunteer = require('../../models/volunteers');

// @route GET api/Volunteers/get
// should return all volunteers
router.get('/get', (req, res) => {
    volunteer.find((err, volunteers) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: volunteers });
    });
});

module.exports = router;

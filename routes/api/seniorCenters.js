const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/addSeniorCenter');

const SeniorCenter = require('../../models/SeniorCenter');

// @route POST api/seniorCenter/add
// @desc adding a seniorCenter
// @access Public
router.post('/add', (req, res) => {
    // Form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    SeniorCenter.findOne({ email: req.body.name }).then(seniorCenter => {
        if (seniorCenter) {
            return res.status(400).json({ email: 'Center already exists' });
        } else {
            const newSeniorCenter = new SeniorCenter({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                operationHours: req.body.operationHours
            });

            newSeniorCenter
                .save()
                .then(SeniorCenter => res.json(SeniorCenter))
                .catch(err => console.log(err));
        }
    });
});

module.exports = router;

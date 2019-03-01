const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/addSeniorCenter');

const SeniorCenter = require('../../models/SeniorCenter');

//@route DELETE api/seniorCenters/delete/:id
// should delete a specified seniorCenter by id
router.delete('/delete/:id', (req, res) => {
    SeniorCenter.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//@route GET api/seniorCenters/get
//should return all seniorCenters
router.get('/get', (req, res) => {
    SeniorCenter.find((err, seniorCenters) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: seniorCenters });
    });
});

// @route GET api/seniorCenters/get/:id
// shoudl return seniorCenter by Id
router.get('/get/:id', (req, res) => {
    SeniorCenter.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return next(err);
        return res.json(post);
    });
});

// @route POST api/seniorCenters/filter
// should return filtered results from json
router.post('/filter', (req, res) => {
    SeniorCenter.find(res.body, (err, seniorCenters) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(seniorCenters);
    });
});

// @route POST api/seniorCenters/add
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
                .then(seniorCenter => res.json(seniorCenter))
                .catch(err => console.log(err));
        }
    });
});

module.exports = router;

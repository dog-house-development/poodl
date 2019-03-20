const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load model
const SeniorCenter = require('mongoose').model('SeniorCenter');

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

// @route POST api/seniorCenter/edit/:id
//should edit a senior center given an id
router.post('/edit/:id', (req, res) => {
    const { errors, isValid } = validateEditInputById(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    SeniorCenter.findOne({ _id: req.params.id }).then(seniorCenter => {
        if (!seniorCenter) {
            return res.status(400).json({ _id: 'SeniorCenter does not exist' });
        } else {
            if (req.body.name != '') {
                seniorCenter.name = req.body.name;
            }
            if (req.body.email != '') {
                seniorCenter.email = req.body.email;
            }
            if (req.body.address != '') {
                seniorCenter.address = req.body.address;
            }
            if (req.body.phone != '') {
                seniorCenter.phone = req.body.phone;
            }
            if (req.body.operationHours != '') {
                seniorCenter.operationHours = req.body.operationHours;
            }
        }
        seniorCenter
            .save()
            .then(SeniorCenter => res.json(SeniorCenter))
            .catch(err => console.log(err));
    });
});

// @route POST api/seniorCenters/filter
// should return filtered results from json
router.post('/filter', (req, res) => {
    const request = jsonBuilder(req.body);
    SeniorCenter.find(request[0], (err, seniorCenters) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: seniorCenters });
    })
        .skip(request[2] * request[1]) // paging function
        .limit(request[2]);
});

// @route POST api/seniorCenters/add
// @desc adding a seniorCenter
// @access Public
router.post('/add', (req, res) => {
    const newSeniorCenter = new SeniorCenter(req.body);
    if (invalid(newSeniorCenter, res)) return;
    newSeniorCenter
        .save()
        .then(SeniorCenter => res.json(SeniorCenter))
        .catch(err => console.log(err));
});

module.exports = router;

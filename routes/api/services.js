const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Validation goes here
const validateRegisterInput = require('../../validation/addService');

//Load model
const Service = require('../../models/Service');

//@router DELETE api/services/delete/:id
//should delete a service based on the id
router.delete('/delete/:id', (req, res) => {
    Service.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//@route GET api/services/get
//should return all services
router.get('/get', (req, res) => {
    Service.find((err, services) => {
        if (err) return res.json({ sucess: false, error: err });
        return res.json({ success: true, data: services });
    });
});

//@route GET api/services/get/:id
//should return service by id
router.get('/get/:id', (req, res, next) => {
    Service.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return next(err);
        return res.json(post);
    });
});

// @route POST api/services/add
// @desc add a service
router.post('/add', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Service.findOne({ name: req.body.name }).then(service => {
        if (service) {
            return res.status(400).json({ name: 'Service already exists' });
        } else {
            const newService = new Service({
                name: req.body.name,
                times: req.body.times,
                dates: req.body.dates,
                admins: req.body.admins,
                volunteers: req.body.volunteers,
                members: req.body.members,
                seniorCenter: req.body.seniorCenter
            });
            newService
                .save()
                .then(Service => res.json(Service))
                .catch(err => console.log(err));
        }
    });
});

module.exports = router;

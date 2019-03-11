const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Validation goes here
const validateRegisterInput = require('../../validation/service/addService');
const validateEditInputByID = require('../../validation/service/editServiceByID');
const validateFilterInput = require('../../validation/service/serviceFilter');

//Load Utils
const jsonBuilder = require('../../utility/stringConverter');

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

//@route POST api/services/get/:id
//should edit something by id
router.post('/edit/:id', (req, res) => {
    const { errors, isValid } = validateEditInputByID(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Service.findOne({
        _id: req.params.id
    }).then(service => {
        if (!service) {
            return res.status(400).json({ _id: 'Service does not exist' });
        } else {
            if (req.body.name != '') {
                service.name = req.body.name;
            }
            if (req.body.seniorCenterId != '') {
                service.seniorCenterId = req.body.seniorCenterId;
            }
            if (req.body.memberId != '') {
                service.memberId = req.body.memberId;
            }
            if (req.body.description != '') {
                service.description = req.body.description;
            }
        }
        service
            .save()
            .then(Service => res.json(Service))
            .catch(err => console.log(err));
    });
});

// @route POST api/services/filter
// should return filtered results from json
router.post('/filter', (req, res) => {
    const request = jsonBuilder(req.body);

    Service.find(request[0], (err, services) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: services });
    })
        .skip(request[2] * request[1]) // paging function
        .limit(request[2]);
});

// @route POST api/services/add
// @desc add a service
router.post('/add', (req, res) => {
    const newService = new Service(req.body);
    error = newService.validateSync();
    newService
        .save()
        .then(Service => res.json(Service))
        .catch(err => console.log(err));
});

module.exports = router;

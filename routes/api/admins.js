const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/registerAdmin');
const validateLoginInput = require('../../validation/login');

// Load Admin model
const Admin = require('../../models/Admin');

//@route DELETE api/admins/delete/:id
// should delete specified admin by ID
router.delete('/delete/:id', (req, res) => {
    Admin.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// @route GET api/admins/get
// should return all admins
router.get('/get', (req, res) => {
    Admin.find((err, admins) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: admins });
    });
});

//@route GET api/admins/get/:id
//should return admin with given id
router.get('/get/:id', (req, res, next) => {
    Admin.findOne({ _id: req.params.id }, (err, admin) => {
        if (err) return next(err);
        return res.json(admin);
    });
});

//@route GET api/admins/get
//should return admins with ids from list
//takes json _id: []
router.post('/get', (req, res) => {
    Admin.find({ _id: req.body._id }, (err, admins) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(admins);
    });
});

// @route POST api/admins/filter
// should return filtered results from json
router.post('/filter', (req, res) => {
    Admin.find(res.body, (err, admins) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(admins);
    });
});

// @route POST api/admins/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
    // Form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Admin.findOne({ email: req.body.email }).then(admin => {
        if (admin) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                seniorCenter: req.body.seniorCenter
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAdmin.password = hash;
                    newAdmin
                        .save()
                        .then(admin => res.json(admin))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/admins/login
// @desc Login Admin and return JWT token
// @access Public
router.post('/login', (req, res) => {
    // Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find Admin by email
    Admin.findOne({ email }).then(admin => {
        // Check if Admin exists
        if (!admin) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }

        // Check password
        bcrypt.compare(password, admin.password).then(isMatch => {
            if (isMatch) {
                // Admin matched
                // Create JWT Payload
                const payload = {
                    id: admin.id,
                    name: admin.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;

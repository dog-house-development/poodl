// libraries
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

// misc
const keys = require('../../config/keys');
const ApiHelper = require('./utils/apiHelper');

// input validation
const validateRegisterAdmin = require('./validation/admin/registerAdmin');
const validateLoginInput = require('./validation/admin/login');

const router = express.Router();
const Admin = mongoose.model('Admin');

const sendJwt = (req, res) => {
    console.log('send jwt');
    // Create JWT Payload, basically what we want to send in the response
    const { user } = req;
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        seniorCenterId: user.seniorCenterId,
        accessLevel: user.accessLevel
    };

    // Sign token
    return jwt.sign(
        payload,
        keys.jwtKey,
        {
            expiresIn: 20
        },
        (err, token) => {
            if (err) {
                return res.status(400).json(err);
            }

            return res.json({
                token: 'Bearer ' + token
            });
        }
    );
};

// @route DELETE api/admins/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Admin.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!doc) {
            return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
        }

        // Remove the admins's id from any activity's admin array.
        mongoose.model('Activity').updateMany(
            {},
            {
                $pull: {
                    admins: id
                }
            },
            err => {
                if (err) {
                    return res.status(404).json(err);
                }
            }
        );

        return res.json(doc);
    });
});

// @route POST api/admins/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newAdmin = new Admin(req.body);

    const { errors, isValid } = validateRegisterAdmin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(400).json(err);
        }

        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) {
                return res.status(400).json(err);
            }

            newAdmin.password = hash;
            newAdmin
                .save()
                .then(admin => res.json(admin))
                .catch(err => {
                    return res.status(400).json(err);
                });
        });
    });
});

// @route POST api/admins/login
// @desc Login Admin and return JWT token
// @access Public
router.post(
    '/login',
    (req, res, next) => {
        // Form validation
        const { errors, isValid } = validateLoginInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        const notFoundError = {
            error: 'Email and password combination not found'
        };

        // Find Admin by email
        Admin.findOne({ email }).then(admin => {
            // Check if Admin exists
            if (!admin) {
                return res.status(404).json(notFoundError);
            }

            // Check password
            bcrypt.compare(password, admin.password).then(isMatch => {
                if (isMatch) {
                    req.user = admin;
                    next();
                } else {
                    return res.status(404).json(notFoundError);
                }
            });
        });
    },
    sendJwt
);

// @route GET api/admins/refresh-token
// @desc Login Admin and return JWT token
// @access Public
router.get('/refresh-token', passport.authenticate('jwt', { session: false }), sendJwt);

// @route POST api/admins/filter
ApiHelper.filter(router, Admin);

// @route GET api/admins/:id
ApiHelper.get(router, Admin);

// @route PATCH api/admins/:id
ApiHelper.edit(router, Admin);

module.exports = router;

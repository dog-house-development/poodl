// libraries
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// misc
const keys = require('../../config/keys');
const ApiHelper = require('./utils/apiHelper');

// input validation
const validateRegisterAdmin = require('./validation/admin/registerAdmin');
const validateLoginInput = require('./validation/admin/login');

const router = express.Router();
const Admin = require('mongoose').model('Admin');

// @route POST api/admins/filter
ApiHelper.filter(router, Admin);

// @route GET api/admins/:id
ApiHelper.get(router, Admin);

// @route PATCH api/admins/:id
ApiHelper.edit(router, Admin);

// @route DELETE api/admins/:id
ApiHelper.delete(router, Admin);

// @route POST api/admins/
router.post('/', (req, res) => {
    const newAdmin = new Admin(req.body);

    const { errors, isValid } = validateRegisterAdmin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
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
                // Create JWT Payload, basically what we want to send in the response
                const payload = {
                    id: admin.id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    seniorCenterId: admin.seniorCenterId,
                    accessLevel: admin.accessLevel
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

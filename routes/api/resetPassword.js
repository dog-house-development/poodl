const express = require('express');
const Validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');
sgMail.setApiKey(keys.sendGridApiKey);

router.post('/email', (req, res) => {
    const { email, url } = req.body;
    if (!url) {
        return res.status(400).json({ url: 'URL is required' });
    }

    if (!email) {
        return res.status(400).json({ email: 'Email is required' });
    }

    if (!Validator.isEmail(email)) {
        return res.status(400).json({ email: 'Email is invalid' });
    }

    mongoose.model('Admin').findOne({ email }, async (err, admin) => {
        if (!admin) {
            return res.status(400).json({ email: 'A user does not exist with that email' });
        }

        const payload = {
            id: admin.id
        };

        const key = keys.jwtKey + admin.password;
        console.log('key', key);
        const token = jwt.sign(payload, key, {
            expiresIn: 604800 // 1 week in seconds
        });

        console.log(token);

        const msg = {
            to: {
                email: email,
                name: `${admin.firstName} ${admin.lastName}`
            },
            from: {
                email: 'doghousedevelop@gmail.com',
                name: 'Poodl'
            },
            subject: 'Poodl Email Test',
            text: `How are you doing? ${url}/reset-password/${token}`
        };

        try {
            // await sgMail.send(msg);
            return res.json({ message: msg });
        } catch (err) {
            console.log('An error occured when sending the email', err);
            return res.status(400).json(err);
        }
    });
});

router.post('/verify', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ token: 'Token is required' });
    }

    let decodedPayload;

    try {
        decodedPayload = jwt.decode(token);
    } catch (err) {
        return res.status(400).json(err);
    }

    if (!decodedPayload) {
        return res.status(400).json({ token: 'Token could not be decoded' });
    }

    const { id } = decodedPayload;
    console.log('id', id);
    await mongoose.model('Admin').findById(id, (err, admin) => {
        if (err) {
            return res.status(400).json({ token: 'Token is invalid', error: err });
        }

        if (!admin) {
            return res.status(400).json({ token: 'A user does not exist with that id' });
        }

        console.log('admin', admin);

        const key = keys.jwtKey + admin.password;
        console.log('key', key);

        try {
            jwt.verify(token, key);
        } catch (err) {
            return res.status(400).json({ token: 'Token is invalid', error: err });
        }

        return res.json('success');
    });
});

module.exports = router;

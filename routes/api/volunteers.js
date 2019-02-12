const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Volunteer model
const Volunteer = require('../../models/Volunteer');

// @route DELETE api/volunteers/delete
// should delete a specified volunteer
//CANNOT TEST LIKE OTHER DELETE WILL DO IN TICKET SOON
router.delete('/delete/:id', (req, res) => {
    Volunteer.findByIdAndRemove({ _id: req.params.id }, (err, item) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// @route GET api/volunteers/get
// should return all volunteers
router.get('/get', (req, res) => {
    Volunteer.find((err, volunteers) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: volunteers });
    });
});

module.exports = router;

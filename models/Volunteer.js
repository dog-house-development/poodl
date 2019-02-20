const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VolunteerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        seniorCenter: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('volunteers', VolunteerSchema);

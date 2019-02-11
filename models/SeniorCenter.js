const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SeniorCenterSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        operationHours: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
); // this might cause problems!!!!

module.exports = SeniorCenter = mongoose.model('seniorCenters', SeniorCenterSchema);

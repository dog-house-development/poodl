const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

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
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('seniorCenters', SeniorCenterSchema);

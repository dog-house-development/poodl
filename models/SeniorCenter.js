const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const SeniorCenterSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required']
        },
        email: {
            type: String,
            required: [true, 'Email field is required']
        },
        address: {
            type: String,
            required: [true, 'Address field is required']
        },
        phone: {
            type: String,
            required: [true, 'Phone field is required']
        },
        operationHours: {
            type: String,
            required: [true, 'operationHours field is required']
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('seniorCenters', SeniorCenterSchema);

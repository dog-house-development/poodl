const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const seniorCenterSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        phone: {
            type: String,
            required: [true, 'Phone is required']
        },
        operationHours: {
            type: String,
            required: [true, 'Operation hours is required']
        }
    },
    { timestamps: true }
);

seniorCenterSchema.plugin(require('./plugins/duplicateError'), { name: 'Senior center already exists' });

module.exports = seniorCenterSchema;

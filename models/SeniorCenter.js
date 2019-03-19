const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const keyError = require('../utility/schemaMiddleware');

// Create Schema
const schema = new Schema(
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

schema.post('save', keyError({ name: 'Senior Center already exists' }));

module.exports = mongoose.model('seniorCenters', schema);

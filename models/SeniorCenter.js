const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Validator = require('validator');

const seniorCenterSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: {
                validator: Validator.isEmail,
                message: 'Email is invalid'
            }
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            validate: {
                validator: Validator.isMobilePhone,
                message: 'Phone number is invalid'
            }
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

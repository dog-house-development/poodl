const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const keyError = require('../utility/schemaMiddleware');

const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required']
        },
        seniorCenterId: {
            type: ObjectId,
            required: [true, 'seniorCenterId field is required']
        },
        memberId: {
            type: ObjectId,
            required: [true, 'memberId field is required']
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('services', schema);

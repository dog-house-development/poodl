const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        details: {
            type: String
        },
        seniorCenterId: {
            type: ObjectId,
            required: [true, 'Senior Center Id is required']
        },
        memberId: {
            type: ObjectId,
            required: [true, 'Member Id is required']
        }
    },
    { timestamps: true }
);

module.exports = serviceSchema;

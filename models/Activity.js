const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const keyError = require('../utils/schemaMiddleware');

const schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        startDate: {
            type: Date,
            required: [true, 'Start Date is required']
        },
        endDate: {
            type: Date,
            required: [true, 'End Date is required']
        },
        // should be ObjectId
        volunteers: [ObjectId],
        // should be ObjectId
        members: [ObjectId],
        // should be ObjectId
        seniorCenter: {
            type: ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

// remove later because activity name will be shared with others
// this exists now for an example for other schemas
schema.post('save', keyError({ name: 'Activity already exists' }));

module.exports = mongoose.model('activities', schema);

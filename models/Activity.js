const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const keyError = require('../utility/schemaMiddleware');

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
        admins: [ObjectId],
        members: [ObjectId],
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

schema.pre('save', function(next) {
    if (this.startDate > this.endDate) {
        next({ startDate: 'Start date must be before end date', endDate: 'End date must be after start date' });
    }

    next();
});

module.exports = mongoose.model('activities', schema);

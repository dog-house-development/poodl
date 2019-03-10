const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const ActivitySchema = new Schema(
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
        volunteers: [String],
        // should be ObjectId
        members: [String],
        // should be ObjectId
        seniorCenter: {
            type: String,
            required: true
        },
        maxCapacity: {
            type: Number,
            min: 1
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('activities', ActivitySchema);

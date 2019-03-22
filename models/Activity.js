const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const activitySchema = new Schema(
    {
        seniorCenterId: {
            type: ObjectId,
            required: true
        },
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
            required: [true, 'Start Date is required'],
            validate: {
                validator: function(v) {
                    return v < this.endDate;
                },
                message: 'Start date must be before end date'
            }
        },
        endDate: {
            type: Date,
            required: [true, 'End Date is required']
        },
        admins: [ObjectId],
        members: [ObjectId],
        maxCapacity: {
            type: Number,
            min: 1
        }
    },
    { timestamps: true }
);

module.exports = activitySchema;

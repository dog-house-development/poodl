const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const activitySchema = new Schema(
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
        seniorCenter: {
            type: ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

// remove later because activity name will be shared with others
// this exists now for an example for other activitySchemas
activitySchema.plugin(require('./plugins/duplicateError'), { name: 'Activity already exists' });

module.exports = activitySchema;

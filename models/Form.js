const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const formSchema = new Schema(
    {
        seniorCenterId: {
            type: ObjectId,
            required: true
        },
        fields: {
            type: String,
            required: [true, 'Fields are required']
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
);

module.exports = formSchema;

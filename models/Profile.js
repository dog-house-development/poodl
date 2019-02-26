const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema(
    {
        member: {
            type: Schema.Types.ObjectId,
            ref: 'members'
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        seniorCenter: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        membershipDate: {
            type: String,
            required: true
        },
        renewalDate: {
            type: String,
            required: true
        },
        specialDiet: [
            {
                type: String
            }
        ],
        medicalIssues: [
            {
                type: String
            }
        ],
        disabilities: [
            {
                type: String
            }
        ],
        mealPreference: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('profiles', ProfileSchema);
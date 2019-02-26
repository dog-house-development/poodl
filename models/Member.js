const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MemberSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        seniorCenter: {
            type: String
        },
        address: {
            type: String
        },
        membershipDate: {
            type: Date,
            default: Date.now
        },
        renewalDate: {
            type: String
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

module.exports = mongoose.model('members', MemberSchema);

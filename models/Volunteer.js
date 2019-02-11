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
            type: String,
            required: true
        }
    },
    { timestamps: true }
); // this might cause problems!!!!

module.exports = Member = mongoose.model('volunteers', MemberSchema);

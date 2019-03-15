const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const AdminSchema = new Schema(
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
        },
        password: {
            type: String,
            required: true
        },
        seniorCenter: {
            type: String,
            required: true
        },
        superAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('admins', AdminSchema);

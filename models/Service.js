const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const ServiceSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        //The plan is to have admin and volunteer list be IDs
        admins: [
            {
                type: String
            }
        ],
        volunteers: [
            {
                type: String
            }
        ],
        members: [
            {
                type: String
            }
        ],
        seniorCenter: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('services', ServiceSchema);

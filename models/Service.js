const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    times: [
        {
            type: String,
            required: true
        }
    ],
    dates: [
        {
            type: String,
            required: true
        }
    ],
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
});
module.exports = mongoose.model('services', ServiceSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  name: {
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
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // this might cause problems!!!!

module.exports = Admin = mongoose.model("admins", AdminSchema);

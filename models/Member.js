const mongoose = require("mongoose");
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
      type: String,
      required: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
); // this might cause problems!!!!

module.exports = Member = mongoose.model("members", MemberSchema);

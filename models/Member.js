const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const MemberSchema = new Schema(
    {
        //Contact Info
        email: {
            type: String
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        emergencyContactName: {
            type: String
        },
        emergencyContactRelationship: {
            type: String
        },
        emergencyContactPhoneNumber: {
            type: String
        },
        //Member Info

        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date
        },
        seniorCenterId: {
            type: ObjectId,
            required: true
        },
        specialDiet: {
            type: String
        },
        medicalIssues: {
            type: String
        },
        disabilities: {
            type: String
        },
        mealPreference: {
            type: String
        },
        gender: {
            type: String
        },

        //Membership Information
        memberisNewOrRenewal: {
            type: String,
            default: 'new'
        },
        formOfPayment: {
            type: String
        },
        bankCheckNumber: {
            type: String
        },
        includedInEstatePlans: {
            type: Boolean // If True, means the member has included the center
        }, // in their estate plans
        wantsEstateInfo: {
            type: Boolean // True = Member would like more info
        }, // False = Member does not want more info
        membershipDate: {
            type: Date,
            default: Date.now
        },
        renewalDate: {
            type: String
        },

        //Demographic info from Intake Form
        race: {
            type: String
        },
        ethnicity: {
            type: String
        },
        numberInHousehold: {
            type: String
        },
        isPersonCaregiver: {
            type: Boolean
        },
        monthlyIncome: {
            type: String
        },
        isDisabled: {
            type: Boolean
        },
        isVeteran: {
            type: Boolean
        },
        isSpouse60: {
            type: Boolean
        },
        isDisabled60: {
            type: Boolean
        },
        caregiver: {
            type: String
        },
        grandparent: {
            type: String
        },
        numberOfKidsUnder19: {
            type: String
        },
        needsAADL: {
            type: String
        },
        needsIADL: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('members', MemberSchema);

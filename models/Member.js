const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Validator = require('validator');

const memberSchema = new Schema(
    {
        seniorCenterId: {
            type: ObjectId,
            required: true
        },
        // Contact Info
        email: {
            type: String,
            validate: {
                validator: Validator.isEmail,
                message: 'Email is invalid'
            }
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: Validator.isMobilePhone,
                message: 'Phone number is invalid'
            }
        },
        emergencyContactName: {
            type: String
        },
        emergencyContactRelationship: {
            type: String
        },
        emergencyContactPhoneNumber: {
            type: String,
            validate: {
                validator: Validator.isMobilePhone,
                message: 'Phone number is invalid'
            }
        },
        // Member Info
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        birthDate: {
            type: Date
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

        // Membership Information
        memberIsNewOrRenewal: {
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
            // The member has included the center in their estate plans
            type: Boolean,
            default: false
        },
        wantsEstateInfo: {
            type: Boolean,
            default: false
        },
        membershipDate: {
            type: Date,
            default: Date.now
        },
        renewalDate: {
            type: Date
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
            type: Number,
            min: 0,
            default: 0
        },
        needsAADL: {
            type: [String]
        },
        needsIADL: {
            type: [String]
        },
        checkIns: [Date]
    },
    { timestamps: true }
);

module.exports = memberSchema;

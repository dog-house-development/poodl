const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

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
            type: String
        },
        birthDate: {
            type: Date,
            default: Date.now
        },
        seniorCenter: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        emergencyContact: [
            {
                type: String
            }
        ],
        memberisNewOrRenewal: {
            type: Boolean //True = New, False = Renewal
        },
        formOfPayment: {
            type: Boolean //True = Cash, False = Check
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

        //Demographic info from Intake Form
        race: {
            type: String
        },
        ethnicity: {
            type: String
        },
        numberInHousehold: {
            type: Number
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
        needsAADL: {
            type: Boolean
        },
        needsIADL: {
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('members', MemberSchema);

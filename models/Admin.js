const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Validator = require('validator');

const adminSchema = new Schema(
    {
        seniorCenterId: {
            type: ObjectId,
            required: true
        },
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            validate: {
                validator: Validator.isEmail,
                message: 'Email is invalid'
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            hide: true
        },
        accessLevel: {
            type: String,
            enum: ['Super', 'Admin', 'Volunteer'],
            default: 'Admin',
            required: [true, 'Access Level is required']
        },
        middleInitial: {
            type: String
        },
        nickName: {
            type: String
        },
        streetAddress: {
            type: String,
            required: [
                function() {
                    return this.accessLevel === 'Volunteer';
                },
                'Street address is required'
            ]
        },
        city: {
            type: String,
            required: [
                function() {
                    return this.accessLevel === 'Volunteer';
                },
                'City is required'
            ]
        },
        state: {
            type: String,
            required: [
                function() {
                    return this.accessLevel === 'Volunteer';
                },
                'State is required'
            ]
        },
        zip: {
            type: String,
            required: [
                function() {
                    return this.accessLevel === 'Volunteer';
                },
                'Zip is required'
            ],
            validate: {
                validator: v => Validator.isPostalCode(v, 'US'),
                message: 'Zip code is invalid'
            }
        },
        homePhone: {
            type: String,
            required: [
                function() {
                    return this.accessLevel === 'Volunteer' && !this.cellPhone;
                },
                'At least one phone number is required'
            ],
            validate: {
                validator: function(v) {
                    if (v) {
                        return Validator.isMobilePhone(v);
                    }
                },
                message: 'Home phone is invalid'
            }
        },
        cellPhone: {
            type: String,
            required: [
                function() {
                    return this.accessLevel === 'Volunteer' && !this.homePhone;
                },
                ' '
            ],
            validate: {
                validator: function(v) {
                    if (v) {
                        return Validator.isMobilePhone(v);
                    }
                },
                message: 'Cell phone is invalid'
            }
        },
        reference1Name: {
            type: String
        },
        reference1Relationship: {
            type: String
        },
        reference1Phone: {
            type: String,
            validate: {
                validator: function(v) {
                    if (v) {
                        return Validator.isMobilePhone(v);
                    }
                },
                message: 'Phone is invalid'
            }
        },
        reference2Name: {
            type: String
        },
        reference2Relationship: {
            type: String
        },
        reference2Phone: {
            type: String,
            validate: {
                validator: function(v) {
                    if (v) {
                        return Validator.isMobilePhone(v);
                    }
                },
                message: 'Phone is invalid'
            }
        },
        reference3Name: {
            type: String
        },
        reference3Relationship: {
            type: String
        },
        reference3Phone: {
            type: String,
            validate: {
                validator: function(v) {
                    if (v) {
                        return Validator.isMobilePhone(v);
                    }
                },
                message: 'Phone is invalid'
            }
        },

        learnAboutVolunteerProgram: {
            type: String
            // Look in volunteer inputs for enum
        },
        volunteerFrequency: {
            type: String
        },
        occasionalOneDayProjects: {
            type: Boolean,
            default: false
        },
        singleDayActivity: {
            type: Boolean,
            default: false
        },
        availabilitySchedule: {
            type: String
        },
        houseMaintenanceAndRepairs: [
            {
                type: String
                // Look in volunteer inputs for enum
            }
        ],
        groundMaintenance: [
            {
                type: String
            }
        ],
        clericalAssistance: [
            {
                type: String
            }
        ],
        nutritionProgram: [
            {
                type: String
            }
        ],
        specialEventsAndFundRaising: [
            {
                type: String
            }
        ],
        interpretingTeachingClassesOrWorkshops: [
            {
                type: String
            }
        ],
        proposedActivities: {
            type: String
        }
    },
    { timestamps: true }
);

adminSchema.plugin(require('./plugins/duplicateError'), { email: 'Email already exists' });
adminSchema.plugin(require('mongoose-hidden')({ defaultHidden: { _id: false } }));

module.exports = adminSchema;

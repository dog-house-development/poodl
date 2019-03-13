const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const keyError = require('../utility/schemaMiddleware');

// Create Schema
const schema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'firstName field is required']
        },
        lastName: {
            type: String,
            required: [true, 'lastName field is required']
        },
        email: {
            type: String,
            required: [true, 'email field is required']
        },
        password: {
            type: String,
            required: [true, 'password field is required']
        },
        accessLevel: {
            type: String,
            enum: ['SuperAdmin', 'Admin', 'Volunteer'],
            default: 'None',
            require: [true, 'accessLevel field is required']
        },
        seniorCenterId: {
            type: ObjectId
            //required: [true, 'seniorCenterId field is required']
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
                    return this.accessLevel == 'Volunteer';
                },
                'streetAddress field is required'
            ]
        },
        city: {
            type: String,
            required: [
                function() {
                    return this.accessLevel == 'Volunteer';
                },
                'city field is required'
            ]
        },
        state: {
            type: String,
            required: [
                function() {
                    return this.accessLevel == 'Volunteer';
                },
                'state field is required'
            ]
        },
        zip: {
            type: Number,
            required: [
                function() {
                    return this.accessLevel == 'Volunteer';
                },
                'zip field is required'
            ]
        },
        homePhone: {
            type: Number,
            required: [
                function() {
                    return this.accessLevel == 'Volunteer';
                },
                'homePhone field is required'
            ]
        },
        cellPhone: {
            type: String,
            required: [
                function() {
                    return this.accessLevel == 'Volunteer';
                },
                'cellPhone field is required'
            ]
        },
        references: [
            {
                type: String,
                required: [
                    function() {
                        return this.accessLevel == 'Volunteer';
                    },
                    'references field is required'
                ]
            }
        ],
        learnAboutVolunteerProgram: {
            type: String,
            enum: [
                'Friend or Relative',
                'Brochure/Poster',
                'Newspaper, Television or Radio',
                'School or College',
                'Belgrade Senior Center',
                'United Way',
                'Community Event',
                'Other',
                'None'
            ],
            default: 'None'
        },
        howOften: {
            type: String
        },
        availability: {
            type: String
        },
        houseMaintenanceAndRepairs: [
            {
                type: String,
                enum: ['Carpentry', 'Plumbing', 'Masonry', 'Cleaning', 'Electrical', 'Painting', 'None'],
                default: 'None'
            }
        ],
        groundMaintenance: [
            {
                type: String,
                enum: [
                    'Lawn Maintnance',
                    'Grounds Cleanup',
                    'Pruning Trees and Shrubs',
                    'Planting and Maintaining Flower Beds',
                    'Snow Removal',
                    'None'
                ],
                default: 'None'
            }
        ],
        clericalAssistance: [
            {
                type: String,
                enum: [
                    'Data Entry',
                    'Folding Brochures',
                    'General Office',
                    'Preparing Bulk Mailings',
                    'Front Desk',
                    'None'
                ],
                default: 'None'
            }
        ],
        nutritionProgram: [
            {
                type: String,
                enum: ['Food Prep', 'Dishes', 'Deliver Meals on Wheels', 'Dining Room Setup', 'None'],
                default: 'None'
            }
        ],
        specialEventsAndFundRaising: [
            {
                type: String,
                enum: [
                    'Create Flyers, Brochures, and/or Posters',
                    'Assist with Events',
                    'Solicit Auction Items,Donations, Prizes, In-Kind Services',
                    'None'
                ],
                default: 'None'
            }
        ],
        interpretingTeachingClassesOrWorkshops: [
            {
                type: String,
                enum: ['Life Skill Classes', 'Painting, Crafts', 'Computer', 'Exercise', 'None'],
                default: 'None'
            }
        ],
        otherInterests: {
            type: String
        }
    },
    { timestamps: true }
);

schema.post('save', keyError({ email: 'Activity already exists' }));

module.exports = mongoose.model('admins', schema);

const volunteerInputs = [
    {
        id: 'personalInfo',
        label: 'Personal Info',
        kind: 'group',
        inputs: [
            {
                id: 'name',
                kind: 'flex',
                inputs: [
                    {
                        id: 'firstName',
                        kind: 'field',
                        type: 'text',
                        label: 'First name',
                        style: {
                            flex: 3
                        }
                    },
                    {
                        id: 'middleInitial',
                        kind: 'field',
                        label: 'M.I.',
                        style: {
                            flex: 1
                        }
                    },
                    {
                        id: 'lastName',
                        kind: 'field',
                        type: 'text',
                        label: 'Last name',
                        style: {
                            flex: 3
                        }
                    },
                    {
                        id: 'nickName',
                        kind: 'field',
                        label: 'Nickname',
                        style: {
                            flex: 2
                        }
                    }
                ]
            },
            {
                id: 'email',
                kind: 'field',
                type: 'email',
                label: 'Email'
            },
            {
                id: 'password',
                kind: 'field',
                type: 'password',
                label: 'Password',
                editable: false
            },
            {
                id: 'password2',
                kind: 'field',
                type: 'password',
                label: 'Confirm Password',
                editable: false
            },
            {
                id: 'address',
                kind: 'flex',
                inputs: [
                    {
                        id: 'streetAddress',
                        kind: 'field',
                        label: 'Street Address',
                        style: {
                            flex: 3
                        }
                    },
                    {
                        id: 'city',
                        kind: 'field',
                        label: 'City',
                        style: {
                            flex: 2
                        }
                    },
                    {
                        id: 'state',
                        kind: 'field',
                        label: 'State',
                        style: {
                            flex: 1
                        }
                    },
                    {
                        id: 'zip',
                        kind: 'field',
                        label: 'ZIP',
                        style: {
                            flex: 1
                        }
                    }
                ]
            },
            {
                id: 'phones',
                kind: 'flex',
                inputs: [
                    {
                        id: 'homePhone',
                        kind: 'field',
                        label: 'Home Phone'
                    },
                    {
                        id: 'cellPhone',
                        kind: 'field',
                        label: 'Cell or Message Phone'
                    }
                ]
            }
        ]
    },
    {
        id: 'references',
        label: 'References',
        kind: 'group',
        inputs: [
            {
                id: 'reference1',
                kind: 'flex',
                label: 'Reference #1',
                inputs: [
                    {
                        id: 'reference1Name',
                        kind: 'field',
                        label: 'Name'
                    },
                    {
                        id: 'reference1Relationship',
                        kind: 'field',
                        label: 'Relationship'
                    },
                    {
                        id: 'reference1Phone',
                        kind: 'field',
                        label: 'Phone'
                    }
                ]
            },
            {
                id: 'reference2',
                kind: 'flex',
                label: 'Reference #2',
                inputs: [
                    {
                        id: 'reference2Name',
                        kind: 'field',
                        label: 'Name'
                    },
                    {
                        id: 'reference2Relationship',
                        kind: 'field',
                        label: 'Relationship'
                    },
                    {
                        id: 'reference2Phone',
                        kind: 'field',
                        label: 'Phone'
                    }
                ]
            },
            {
                id: 'reference3',
                kind: 'flex',
                label: 'Reference #3',
                inputs: [
                    {
                        id: 'reference3Name',
                        kind: 'field',
                        label: 'Name'
                    },
                    {
                        id: 'reference3Relationship',
                        kind: 'field',
                        label: 'Relationship'
                    },
                    {
                        id: 'reference3Phone',
                        kind: 'field',
                        label: 'Phone'
                    }
                ]
            }
        ]
    },
    {
        id: 'volunteerInfo',
        label: 'Volunteer Info',
        kind: 'group',
        inputs: [
            {
                id: 'learnAboutVolunteerProgram',
                kind: 'radio',
                label: "How did you learn about Belgrade Senior Center's volunteer program",
                options: [
                    'Friend or Relative',
                    'Brochure/Poster',
                    'Newspaper, Television or Radio',
                    'School or College',
                    'Belgrade Senior Center',
                    'United Way',
                    'Community Event',
                    'Other'
                ]
            },
            {
                id: 'volunteerFrequency',
                kind: 'field',
                label: 'How often would you like to volunteer?'
            },
            {
                id: 'occasionalOneDayProjects',
                kind: 'selectBoolean',
                label: 'I would like to be contacted for occasional one-day projects that fit my skills and interests'
            },
            {
                id: 'singleDayActivity',
                kind: 'selectBoolean',
                label: 'I would like to volunteer for a single day activity.'
            },
            {
                id: 'availabilitySchedule',
                kind: 'field',
                label: 'What is your availability schedule?'
            }
        ]
    },
    {
        id: 'skills',
        kind: 'group',
        label: 'Skills and Interests',
        description: 'Please check all that apply.',
        inputs: [
            {
                id: 'houseMaintenanceAndRepairs',
                kind: 'multiCheckbox',
                label: 'Housing Maintenance and Repairs (weekday and weekend days)',
                options: ['Carpentry', 'Plumbing', 'Masonry', 'Cleaning', 'Electrical', 'Painting']
            },
            {
                id: 'groundMaintenance',
                kind: 'multiCheckbox',
                label: 'Grounds Maintenance (any time)',
                options: [
                    'Lawn Maintenance',
                    'Grounds Cleanup',
                    'Pruning Trees and Shrubs',
                    'Planting and Maintaining Flower Beds',
                    'Snow Removal'
                ]
            },
            {
                id: 'clericalAssistance',
                kind: 'multiCheckbox',
                label: 'Clerical Assistance (week days)',
                options: ['Data Entry', 'Folding Brochures', 'General Office', 'Preparing Bulk Mailings', 'Front Desk']
            },
            {
                id: 'nutritionProgram',
                kind: 'multiCheckbox',
                label: 'Nutrition Program',
                options: ['Food Prep', 'Dishes', 'Deliver Meals on Wheels', 'Dining Room Setup']
            },
            {
                id: 'specialEventsAndFundRaising',
                kind: 'multiCheckbox',
                label: 'Special Events and Fundraising',
                options: [
                    'Create Flyers, Brochures, and/or Posters',
                    'Assist with Events',
                    'Solicit Auction Items, Donations, Prizes, In-Kind Services'
                ]
            },
            {
                id: 'interpretingTeachingClassesOrWorkshops',
                kind: 'multiCheckbox',
                label: 'Interpreting, Teaching Classes or Workshops',
                options: ['Life Skill Classes', 'Painting, Crafts', 'Computer', 'Exercise']
            },
            {
                id: 'proposedActivities',
                kind: 'field',
                label: 'Please specify or propose any other volunteer opportunity'
            }
        ]
    }
];

export default volunteerInputs;

const volunteerInputs = [
    {
        id: 'Personal Info',
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
                            // width: '10em',
                            flexGrow: '5'
                        }
                    },
                    {
                        id: 'middleInitial',
                        kind: 'field',
                        label: 'M.I.',
                        style: {
                            // width: '2em'
                        }
                    },
                    {
                        id: 'lastName',
                        kind: 'field',
                        type: 'text',
                        label: 'Last name',
                        style: {
                            // width: '10em'
                        }
                    },
                    {
                        id: 'nickName',
                        kind: 'field',
                        label: 'Nickname or Preferred Name',
                        style: {
                            // width: '10em'
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
                        label: 'Street Address'
                    },
                    {
                        id: 'city',
                        kind: 'field',
                        label: 'City'
                    },
                    {
                        id: 'state',
                        kind: 'field',
                        label: 'State'
                    },
                    {
                        id: 'zip',
                        kind: 'field',
                        label: 'ZIP'
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
            },
            {
                id: 'references',
                kind: 'field',
                label: 'References'
            }
        ]
    },
    {
        id: 'Volunteer Info',
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
        label: 'Skills and Interests (please check all that apply)',
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

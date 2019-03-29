import moment from 'moment';

const memberInputs = [
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
                        label: 'First name'
                    },
                    {
                        id: 'lastName',
                        kind: 'field',
                        type: 'text',
                        label: 'Last name'
                    }
                ]
            },
            {
                id: 'birthDate',
                kind: 'datePicker',
                label: 'Date of Birth',
                minYear: 1900,
                maxYear: 1990,
                value: moment('1-1-1950', 'M-D-YYYY')
            },
            {
                id: 'email',
                kind: 'field',
                type: 'email',
                label: 'Email'
            },
            {
                id: 'address',
                kind: 'field',
                type: 'text',
                label: 'Address'
            },
            {
                id: 'gender',
                kind: 'radio',
                label: 'Gender',
                options: ['male', 'female', 'other']
            }
        ]
    },
    {
        id: 'Emergency Contact Info',
        kind: 'group',
        inputs: [
            {
                id: 'emergencyContactName',
                kind: 'field',
                type: 'text',
                label: 'Emergency Contact Name'
            },
            {
                id: 'emergencyContactRelationship',
                kind: 'field',
                type: 'text',
                label: 'Emergency Contact Relationship'
            },
            {
                id: 'emergencyContactPhoneNumber',
                kind: 'field',
                type: 'text',
                label: 'Emergency Contact Phone Number'
            }
        ]
    },
    {
        id: 'Membership Details',
        kind: 'group',
        inputs: [
            {
                id: 'memberisNewOrRenewal',
                kind: 'radio',
                label: 'Member is new or renewal',
                options: ['new', 'renewal']
            },
            {
                id: 'formOfPayment',
                kind: 'radio',
                label: 'Method of payment',
                options: ['cash', 'check', 'card', 'other']
            },
            {
                id: 'bankCheckNumber',
                kind: 'field',
                type: 'text',
                label: 'Bank Check Number'
            },
            {
                id: 'includedInEstatePlans',
                kind: 'selectBoolean',
                label: 'Included in Estate Plans'
            },
            {
                id: 'wantsEstateInfo',
                kind: 'selectBoolean',
                label: 'Member Wants Estate Info'
            },
            {
                id: 'membershipDate',
                kind: 'datePicker',
                label: 'Membership Date'
            },
            {
                id: 'renewalDate',
                kind: 'datePicker',
                label: 'Renewal Date'
            }
        ]
    },
    {
        id: 'Health Info',
        kind: 'group',
        inputs: [
            {
                id: 'specialDiet',
                kind: 'field',
                type: 'text',
                label: 'Special Diet'
            },
            {
                id: 'medicalIssues',
                kind: 'field',
                type: 'text',
                label: 'Medical Issues'
            },
            {
                id: 'disabilities',
                kind: 'field',
                type: 'text',
                label: 'Disabilities'
            },
            {
                id: 'mealPreference',
                kind: 'field',
                type: 'text',
                label: 'Meal Preference'
            }
        ]
    },
    {
        id: 'Demographic Info',
        kind: 'group',
        inputs: [
            {
                id: 'race',
                kind: 'field',
                type: 'text',
                label: 'Race'
            },
            {
                id: 'ethnicity',
                kind: 'radio',
                label: 'Ethnicity',
                options: ['Non-Hispanic/Latino', 'Hispanic/Latino']
            },
            {
                id: 'numberInHousehold',
                kind: 'field',
                type: 'text',
                label: 'Number in Household'
            },
            {
                id: 'isPersonCaregiver',
                kind: 'selectBoolean',
                label: 'If number in household is 2 or more, is one person a caregiver?'
            },
            {
                id: 'monthlyIncome',
                kind: 'radio',
                label: 'Monthly Household Income',
                options: [
                    'Under $1,012',
                    'Under $1,372',
                    'Under $1,732',
                    'Under $2,092',
                    'Under $2,452',
                    'Under $2,812',
                    'Over $3,172'
                ]
            },
            {
                id: 'disabled',
                kind: 'flex',
                inputs: [
                    {
                        id: 'isDisabled',
                        kind: 'selectBoolean',
                        label: 'Disabled'
                    },
                    {
                        id: 'isVeteran',
                        kind: 'selectBoolean',
                        label: 'Veteran'
                    },
                    {
                        id: 'isSpouse60',
                        kind: 'selectBoolean',
                        label: 'If under 60, is spouse over 60?'
                    }
                ]
            },
            {
                id: 'isDisabled60',
                kind: 'selectBoolean',
                label: 'If under 60, are you disabled and living with someone over 60?'
            }
        ]
    },
    {
        id: 'Nation Family Caregiver Support Program',
        description:
            'If client is receiving services under National Family Caregiver Support Program, complete the following:',
        kind: 'group',
        inputs: [
            {
                id: 'caregiver',
                kind: 'radio',
                label: 'Caregiver',
                options: ['Husband', 'Wife', 'Daughter/DIL', 'Son/SIL', 'Other Relative', 'Other']
            },
            {
                id: 'grandparent',
                kind: 'radio',
                label: 'Grandparent',
                options: ['Grandparent', 'Other elder relative', 'Other elder non relative']
            },
            {
                id: 'numberOfKidsUnder19',
                kind: 'field',
                label: 'Number of kids younger than 19'
            },
            {
                id: 'needsAADL',
                kind: 'multiCheckbox',
                label: 'Needs Assistance with Activities of Daily Living (ADLs)',
                options: ['Eating', 'Dressing', 'Bathing', 'Toileting', 'Transferring', 'Walking']
            },
            {
                id: 'needsIADL',
                kind: 'multiCheckbox',
                label: 'Needs Assistance with Instrumental Activities of Daily Living (IADLs)',
                options: [
                    'Meal preparation',
                    'Money management',
                    'Shopping',
                    'Transportation',
                    'Telephone use',
                    'Medication management',
                    'Light housework',
                    'Heavy housework'
                ]
            }
        ]
    }
];

export default memberInputs;

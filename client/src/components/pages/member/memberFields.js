export const Categories = {
    personal: { id: 'personal', title: 'Personal Info' },
    emergencyContact: { id: 'emergencyContact', title: 'Emergency Contact Info' },
    membership: { id: 'membership', title: 'Membership Details' },
    demographic: { id: 'demographic', title: 'Demographic Info' },
    health: { id: 'health', title: 'Health Info' },
    nfcsp: {
        id: 'nfcsp',
        title: 'National Family Caregiver Support Program',
        description:
            'If client is receiving services under National Family Caregiver Support Program, complete the following'
    }
};

const memberFields = [
    {
        id: 'firstName',
        type: 'text',
        label: 'First name',
        category: Categories.personal.id
    },
    {
        id: 'lastName',
        type: 'text',
        label: 'Last name',
        category: Categories.personal.id
    },
    {
        id: 'birthDate',
        type: 'text',
        label: 'Date of Birth',
        category: Categories.personal.id
    },
    {
        id: 'email',
        type: 'email',
        label: 'Email',
        category: Categories.personal.id
    },
    {
        id: 'address',
        type: 'text',
        label: 'Address',
        category: Categories.personal.id
    },
    {
        id: 'gender',
        type: 'radio',
        label: 'Gender',
        options: ['male', 'female', 'other'],
        category: Categories.personal.id
    },
    {
        id: 'emergencyContactName',
        type: 'text',
        label: 'Emergency Contact Name',
        category: Categories.emergencyContact.id
    },
    {
        id: 'emergencyContactRelationship',
        type: 'text',
        label: 'Emergency Contact Relationship',
        category: Categories.emergencyContact.id
    },
    {
        id: 'emergencyContactPhoneNumber',
        type: 'text',
        label: 'Emergency Contact Phone Number',
        category: Categories.emergencyContact.id
    },
    {
        id: 'specialDiet',
        type: 'text',
        label: 'Special Diet',
        category: Categories.health.id
    },
    {
        id: 'medicalIssues',
        type: 'text',
        label: 'Medical Issues',
        category: Categories.health.id
    },
    {
        id: 'disabilities',
        type: 'text',
        label: 'Disabilities',
        category: Categories.health.id
    },
    {
        id: 'mealPreference',
        type: 'text',
        label: 'Meal Preference',
        category: Categories.health.id
    },
    {
        id: 'memberisNewOrRenewal',
        type: 'radio',
        label: 'Member is new or renewal',
        options: ['new', 'renewal'],
        category: Categories.membership.id
    },
    {
        id: 'formOfPayment',
        type: 'radio',
        label: 'Method of payment',
        options: ['cash', 'check', 'card', 'other'],
        category: Categories.membership.id
    },
    {
        id: 'bankCheckNumber',
        type: 'text',
        label: 'Bank Check Number',
        category: Categories.membership.id
    },
    {
        id: 'includedInEstatePlans',
        type: 'checkbox',
        label: 'Includedn in Estate Plans',
        category: Categories.membership.id
    },
    {
        id: 'wantsEstateInfo',
        type: 'checkbox',
        label: 'Member Wants Estate Info',
        category: Categories.membership.id
    },
    {
        id: 'membershipDate',
        type: 'text',
        label: 'Membership Date',
        category: Categories.membership.id
    },
    {
        id: 'renewalDate',
        type: 'text',
        label: 'Renewal Date',
        category: Categories.membership.id
    },
    {
        id: 'race',
        type: 'text',
        label: 'Race',
        category: Categories.demographic.id
    },
    {
        id: 'ethnicity',
        type: 'radio',
        label: 'Ethnicity',
        options: ['Non-Hispanic/Latino', 'Hispanic/Latino'],
        category: Categories.demographic.id
    },
    {
        id: 'numberInHousehold',
        type: 'text',
        label: 'Number in Household',
        category: Categories.demographic.id
    },
    {
        id: 'isPersonCaregiver',
        type: 'checkbox',
        label: 'If number in household is 2 or more, is one person a caregiver?',
        category: Categories.demographic.id
    },
    {
        id: 'monthlyIncome',
        type: 'radio',
        label: 'Monthly Household Income',
        options: [
            'Under $1,012',
            'Under $1,372',
            'Under $1,732',
            'Under $2,092',
            'Under $2,452',
            'Under $2,812',
            'Over $3,172'
        ],
        category: Categories.demographic.id
    },
    {
        id: 'isDisabled',
        type: 'checkbox',
        label: 'Disabled',
        category: Categories.demographic.id
    },
    {
        id: 'isVeteran',
        type: 'checkbox',
        label: 'Veteran',
        category: Categories.demographic.id
    },
    {
        id: 'isSpouse60',
        type: 'checkbox',
        label: 'If under 60, is spouse over 60?',
        category: Categories.demographic.id
    },
    {
        id: 'isDisabled60',
        type: 'checkbox',
        label: 'If under 60, are you disabled and living with someone over 60?',
        category: Categories.demographic.id
    },
    {
        id: 'caregiver',
        type: 'radio',
        label: 'Caregiver',
        options: ['Husband', 'Wife', 'Daughter/DIL', 'Son/SIL', 'Other Relative', 'Other'],
        category: Categories.nfcsp.id
    },
    {
        id: 'grandparent',
        type: 'radio',
        label: 'Grandparent',
        options: ['Grandparent', 'Other elder relative', 'Other elder non relative'],
        category: Categories.nfcsp.id
    },
    {
        id: 'numberOfKidsUnder19',
        type: 'text',
        label: 'Number of kids younger than 19',
        category: Categories.nfcsp.id
    },
    {
        id: 'needsAADL',
        type: 'radio',
        label: 'Needs Assistance with Activities of Daily Living (ADLs)',
        options: ['None', 'Eating', 'Dressing', 'Bathing', 'Toileting', 'Transferring', 'Walking'],
        category: Categories.nfcsp.id
    },
    {
        id: 'needsIADL',
        type: 'radio',
        label: 'Needs Assistance with Instrumental Activities of Daily Living (IADLs)',
        options: [
            'None',
            'Meal preparation',
            'Money management',
            'Shopping',
            'Transportation',
            'Telephone use',
            'Medication management',
            'Light housework',
            'Heavy housework'
        ],
        category: Categories.nfcsp.id
    }
];

export default memberFields;

export const Categories = {
    admin: { id: 'admin', title: 'Admin Info' }
};

const adminFields = [
    {
        id: 'firstName',
        type: 'text',
        label: 'First name',
        category: Categories.admin.id
    },
    {
        id: 'lastName',
        type: 'text',
        label: 'Last name',
        category: Categories.admin.id
    },
    {
        id: 'email',
        type: 'email',
        label: 'Email',
        category: Categories.admin.id
    },
    {
        id: 'seniorCenterId',
        type: 'text',
        label: 'Senior  Center ID',
        category: Categories.admin.id
    },
    {
        id: 'accessLevel',
        type: 'radio',
        label: 'Access Level',
        options: ['Super', 'Admin', 'Volunteer'],
        category: Categories.admin.id
    }
];

export default adminFields;

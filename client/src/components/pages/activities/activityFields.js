export const Categories = {
    activity: { id: 'activity', title: 'Activity Info' }
};

const activityFields = [
    {
        id: 'name',
        type: 'combobox',
        label: 'Name',
        placeholder: 'Name...',
        category: Categories.activity.id
    },
    {
        id: 'description',
        type: 'text',
        label: 'Description',
        category: Categories.activity.id
    },
    {
        id: 'startDate',
        type: 'datetime',
        label: '   DATTTEEEE  ',
        category: Categories.activity.id
    },

    {
        id: 'admins',
        type: 'text',
        label: 'Admins',
        category: Categories.activity.id
    },
    {
        id: 'members',
        type: 'text',
        label: 'Members',
        category: Categories.activity.id
    },
    {
        id: 'maxCapacity',
        type: 'text',
        label: 'Max Capacity',
        category: Categories.activity.id
    }
];

export default activityFields;

export const Categories = {
    activity: { id: 'activity', title: 'Activity Info' }
};

const activityFields = [
    {
        id: 'name',
        type: 'text',
        label: 'Name',
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
        type: 'date',
        label: 'Start Date',
        category: Categories.activity.id
    },
    {
        id: 'endDate',
        type: 'date',
        label: 'End Date',
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

export const Categories = {
    activity: { id: 'activity', title: 'Activity Info' }
};

const activityFields = [
    {
        id: 'name',
<<<<<<< HEAD
        type: 'combobox',
        label: 'Name',
        placeholder: 'Name...',
=======
        type: 'text',
        label: 'Name',
>>>>>>> 1a8a06319a7ce4005c4bf74569cda3ad265064fe
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
<<<<<<< HEAD
        type: 'datepicker',
=======
        type: 'date',
>>>>>>> 1a8a06319a7ce4005c4bf74569cda3ad265064fe
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

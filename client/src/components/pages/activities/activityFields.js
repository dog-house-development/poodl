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
        id: 'startTime',
        type: 'timepicker',
        label: 'Start Time',
        category: Categories.activity.id
    },
    {
        id: 'endTime',
        type: 'timepicker',
        label: 'End Time',
        category: Categories.activity.id
    },
    {
        id: 'startDate',
        type: 'datepicker',
        label: 'Start Date',
        category: Categories.activity.id
    },
    {
        id: 'endDate',
        type: 'datepicker',
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

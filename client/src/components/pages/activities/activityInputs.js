module.exports = [
    {
        id: 'name',
        label: 'Name',
        kind: 'combobox',
        placeholder: 'Name'
    },
    {
        id: 'description',
        label: 'Description',
        kind: 'field',
        placeholder: 'Description'
    },
    {
        id: 'time',
        kind: 'flex',
        inputs: [
            {
                id: 'startTime',
                label: 'Start Time',
                kind: 'timePicker'
            },
            {
                id: 'endTime',
                label: 'End Time',
                kind: 'timePicker',
                style: {
                    float: 'right'
                }
            }
        ]
    },
    {
        id: 'date',
        kind: 'datePicker',
        label: 'Date'
    }
];

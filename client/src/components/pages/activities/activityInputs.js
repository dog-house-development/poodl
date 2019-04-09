module.exports = [
    {
        id: 'name',
        label: 'Name',
        kind: 'field'
    },
    {
        id: 'description',
        label: 'Description',
        kind: 'field'
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
                kind: 'timePicker'
            }
        ]
    },
    {
        id: 'date',
        kind: 'datePicker',
        label: 'Date'
    }
];

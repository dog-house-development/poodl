const serviceInputs = [
    {
        id: 'serviceInfo',
        label: '',
        kind: 'group',
        inputs: [
            {
                id: 'name',
                kind: 'combobox',
                label: 'Service Name',
                type: 'text'
            },
            {
                id: 'details',
                kind: 'field',
                type: 'text',
                label: 'Details'
            }
        ]
    }
];

export default serviceInputs;

const adminInputs = [
    {
        id: 'personalInfo',
        label: 'Personal Info',
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
                        label: 'First name',
                        style: {
                            flex: 3
                        }
                    },
                    {
                        id: 'middleInitial',
                        kind: 'field',
                        label: 'M.I.',
                        style: {
                            flex: 1
                        }
                    },
                    {
                        id: 'lastName',
                        kind: 'field',
                        type: 'text',
                        label: 'Last name',
                        style: {
                            flex: 3
                        }
                    },
                    {
                        id: 'nickName',
                        kind: 'field',
                        label: 'Nickname',
                        style: {
                            flex: 2
                        }
                    }
                ]
            },
            {
                id: 'email',
                kind: 'field',
                type: 'email',
                label: 'Email'
            },
            {
                id: 'password',
                kind: 'field',
                type: 'password',
                label: 'Password',
                editable: false
            },
            {
                id: 'password2',
                kind: 'field',
                type: 'password',
                label: 'Confirm Password',
                editable: false
            }
        ]
    }
];

export default adminInputs;

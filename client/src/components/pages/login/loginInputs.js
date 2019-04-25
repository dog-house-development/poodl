const loginInputs = [
    {
        id: 'login',
        label: 'Log In',
        kind: 'group',
        inputs: [
            {
                id: 'email',
                label: 'Email',
                kind: 'field',
                type: 'email',
                placeholder: 'Password'
            },
            {
                id: 'password',
                label: 'Password',
                kind: 'field',
                type: 'password',
                placeholder: 'Password'
            }
        ]
    }
];

export default loginInputs;

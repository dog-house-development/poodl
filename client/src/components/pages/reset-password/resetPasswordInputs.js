const resetPasswordInputs = [
    {
        id: 'resetPassword',
        label: 'Reset Password',
        kind: 'group',
        inputs: [
            {
                id: 'password',
                kind: 'field',
                type: 'password',
                label: 'Password'
            },
            {
                id: 'password2',
                kind: 'field',
                type: 'password',
                label: 'Confirm Password'
            }
        ]
    }
];

export default resetPasswordInputs;

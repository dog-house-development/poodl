describe('email test', () => {
    it.only('should send an email', async () => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(require('../config/keys').sendGridApiKey);
        const msg = {
            to: {
                email: 'gooeydragon@gmail.com',
                name: 'TEST NAME'
            },
            from: {
                email: 'doghousedevelop@gmail.com',
                name: 'Poodl'
            },
            subject: 'Poodl Email Test',
            text: `How are you doing?`
        };

        try {
            await sgMail.send(msg);
            console.log('Mail sent successfully.');
        } catch (err) {
            console.log('An error occured when sending the email', err);
        }
    });
});

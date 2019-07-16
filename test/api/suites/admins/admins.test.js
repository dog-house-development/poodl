const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const getToken = require('../../token/GetToken');
const expectNoErrors = require('../../utils/expectNoErrors');
const FRESHDATA = require('./adminsToSend');
const SAVEDDATA = require('./adminsInDatabase');

const adminsToSend = FRESHDATA.admins;
const adminsInDatabase = SAVEDDATA.admins;

const INITIALDATA = require('../../data/initialData');
const initialAdmin = INITIALDATA.admins[0];
const firstPassword = adminsToSend[0].password;
const secondPassword = adminsToSend[1].password;

module.exports = function() {
    /**
     * Verifies that the actual admin doesn't have password or __v properties.
     * But otherwise the actual admin and expected are equal.
     * @param {object} actualAdmin
     * @param {object} expectedAdmin
     */
    const expectAdminToNotHavePassword = (actualAdmin, expectedAdmin) => {
        expect(actualAdmin).to.not.have.property('password');
        expect(actualAdmin).to.not.have.property('__v');

        actualAdmin.password = expectedAdmin.password;
        actualAdmin.actualPassword = expectedAdmin.actualPassword;
        actualAdmin.__v = expectedAdmin.__v;

        expect(actualAdmin).to.deep.include(expectedAdmin);
    };

    describe('POST /api/admins/login', function() {
        it('should login successfully', async () => {
            const credentials = {
                email: initialAdmin.email,
                password: initialAdmin.actualPassword
            };

            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(credentials);

            expectNoErrors(res);

            const actualDecoded = jwt.decode(res.body.token.split(' ')[1]);
            const expectedDecoded = {
                id: initialAdmin._id,
                firstName: initialAdmin.firstName,
                lastName: initialAdmin.lastName,
                seniorCenterId: initialAdmin.seniorCenterId,
                accessLevel: initialAdmin.accessLevel
            };

            expect(actualDecoded).to.deep.include(expectedDecoded);
            // Expiration (exp) minus issued at (iat) should be how long it takes
            // to expire.
            const hours = 3600;
            expect(actualDecoded.exp - actualDecoded.iat).to.equal(11 * hours);
        });
    });

    describe('POST /api/admins/', function() {
        it('should add a new admin', async () => {
            // Remember that registering the admin will hash the password.
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .set('Authorization', getToken())
                .send(adminsToSend[0]);

            expectNoErrors(res);

            res.body.password = firstPassword;
            res.body.password2 = firstPassword;

            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(adminsToSend[0]);

            const credentials = { email: res.body.email, password: res.body.password };

            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(credentials);

            expectNoErrors(res2);
        });
    });

    describe('POST /api/admins/filter', function() {
        beforeEach(async () => {
            const Admin = mongoose.model('Admin');
            await Admin.insertMany(SAVEDDATA.admins);
        });

        it('should get all admins', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/filter')
                .set('Authorization', getToken())
                .send();

            expectNoErrors(res);
            expect(res).to.have.status(200);

            // Look at second and third admins because the first one
            // is the initial admin that is used for authentication.
            expectAdminToNotHavePassword(res.body[1], adminsInDatabase[0]);
            expectAdminToNotHavePassword(res.body[2], adminsInDatabase[1]);
        });
    });

    describe('GET /api/admins/:id', function() {
        it('it should get a specific admin', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .get('/api/admins/' + initialAdmin._id)
                .set('Authorization', getToken());

            expectNoErrors(res);
            expect(res).to.have.status(200);

            expectAdminToNotHavePassword(res.body, initialAdmin);
        });
    });

    describe('DELETE /api/admins/:id', function() {
        beforeEach(async function() {
            const Admin = mongoose.model('Admin');
            const admin = new Admin(SAVEDDATA.admins[0]);
            await admin.save();
        });

        it('should delete a specific admin', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .delete('/api/admins/' + adminsInDatabase[0]._id)
                .set('Authorization', getToken());

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expectAdminToNotHavePassword(res.body, adminsInDatabase[0]);
        });

        it('should not allow an admin to delete himself', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .delete('/api/admins/' + initialAdmin._id)
                .set('Authorization', getToken());

            expect(res).to.have.status(400);
            expect(res.error.text).to.equal('"An admin cannot delete himself."');
        });
    });
};

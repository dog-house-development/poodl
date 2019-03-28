const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./admins');
const admins = DATA.admins;
const firstPassword = admins[0].password;
const secondPassword = admins[1].password;

module.exports = function() {
    describe('POST /api/admins/', function() {
        it('should add a new admin', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);
            res.body.password = firstPassword;
            res.body.password2 = firstPassword;

            const log = { email: res.body.email, password: res.body.password };

            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(admins[0]);
        });
    });

    describe('POST /api/admins/filter', function() {
        //beforeEach(() => mongoUnit.initDb(process.env.MONGODB_URI, DATA));

        it('should get all admins', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);
            res.body.password = firstPassword;
            res.body.password2 = firstPassword;

            const log = { email: res.body.email, password: res.body.password };
            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);
            const token = res2.body.token;

            const res3 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/filter')
                .set('Authorization', token)
                .send();

            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            // admins[0].password = firstPassword;
            // admins[0].password2 = firstPassword;
            // admins[1].password = secondPassword;
            // admins[1].password2 = secondPassword;
            // delete admins[0]._id;
            // delete admins[1]._id;
            // expect(res3.body[0]).to.deep.include(admins[0]);
            // expect(res3.body[1]).to.deep.include(admins[1]);
        });
    });

    describe('GET /api/admins/:id', function() {
        it('it should get a specific admin', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);
            const log = { email: res1.body.email, password: admins[0].password };
            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);
            const token = res2.body.token;
            const id = res1.body._id;
            const res3 = await chai
                .request(require('../../../../server'))
                .get('/api/admins/' + id)
                .set('Authorization', token);
            res3.body.password = firstPassword;
            res3.body.password2 = firstPassword;
            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            expect(res3.body).to.deep.include(admins[0]);
        });
    });

    describe('DELETE /api/admins/:id', function() {
        it('it should delete a specific admin', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);
            const log = { email: res1.body.email, password: admins[0].password };
            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);
            const token = res2.body.token;
            const id = res1.body._id;
            const res3 = await chai
                .request(require('../../../../server'))
                .delete('/api/admins/' + id)
                .set('Authorization', token);
            res3.body.password = firstPassword;
            res3.body.password2 = firstPassword;

            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            expect(res3.body).to.deep.include(admins[0]);
        });
    });
};

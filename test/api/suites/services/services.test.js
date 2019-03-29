const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./services');
const services = DATA.services;
const service1 = services[0];
const ADMIN_DATA = require('../admins/admins');
const admins = ADMIN_DATA.admins;

module.exports = function() {
    describe('POST /api/services/', function() {
        it('should add a new service', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);

            const log = { email: res.body.email, password: admins[0].password };

            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);
            const token = res2.body.token;
            const res3 = await chai
                .request(require('../../../../server'))
                .post('/api/services/')
                .set('Authorization', token)
                .send(services[0]);

            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            expect(res3.body).to.deep.include(services[0]);
        });
    });

    describe('POST /api/services/filter', function() {
        // beforeEach(() => mongoUnit.initDb(process.env.MONGODB_URI, DATA));

        it('should get all services', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);

            const log = { email: res.body.email, password: admins[0].password };

            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);
            const token = res2.body.token;
            const res3 = await chai
                .request(require('../../../../server'))
                .post('/api/services/filter')
                .set('Authorization', token)
                .send();

            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            // delete services[0]._id;
            // delete services[1]._id;
            // expect(res.body[0]).to.deep.include(services[0]);
            // expect(res.body[1]).to.deep.include(services[1]);
        });
    });

    describe('GET /api/services/:id', function() {
        it('it should get a specific service', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);

            const log = { email: res.body.email, password: admins[0].password };

            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);
            const token = res2.body.token;
            const res3 = await chai
                .request(require('../../../../server'))
                .post('/api/services/')
                .set('Authorization', token)
                .send(services[0]);

            const id = res3.body._id;
            const res4 = await chai
                .request(require('../../../../server'))
                .get('/api/services/' + id)
                .set('Authorization', token);
            expectNoErrors(res4);
            expect(res4).to.have.status(200);
            expect(res4.body).to.deep.include(services[0]);
        });
    });

    describe('DELETE /api/services/:id', function() {
        it('it should delete a specific service', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/admins/')
                .send(admins[0]);

            const log = { email: res.body.email, password: admins[0].password };

            const res2 = await chai
                .request(require('../../../../server'))
                .post('/api/admins/login')
                .send(log);
            const token = res2.body.token;
            const res3 = await chai
                .request(require('../../../../server'))
                .post('/api/services/')
                .set('Authorization', token)
                .send(services[0]);

            const id = res3.body._id;
            const res4 = await chai
                .request(require('../../../../server'))
                .delete('/api/services/' + id)
                .set('Authorization', token);

            expectNoErrors(res4);
            expect(res4).to.have.status(200);
            expect(res4.body).to.deep.include(services[0]);
        });
    });
};

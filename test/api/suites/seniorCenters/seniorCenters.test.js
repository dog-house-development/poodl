const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./seniorCenters');
const seniorCenters = DATA.seniorCenters;
const seniorCenter1 = seniorCenters[0];
const ADMIN_DATA = require('../admins/admins');
const admins = ADMIN_DATA.admins;

module.exports = function() {
    describe('POST /api/seniorCenters/', function() {
        it('should add a new seniorCenter', async () => {
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
                .post('/api/seniorCenters/')
                .set('Authorization', token)
                .send(seniorCenters[0]);

            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            expect(res3.body).to.deep.include(seniorCenters[0]);
        });
    });

    describe('POST /api/seniorCenters/filter', function() {
        it('should get all seniorCenters', async () => {
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
                .post('/api/seniorCenters/')
                .set('Authorization', token)
                .send(seniorCenters[1]);
            const res4 = await chai
                .request(require('../../../../server'))
                .post('/api/seniorCenters/filter')
                .set('Authorization', token)
                .send();

            expectNoErrors(res4);
            expect(res4).to.have.status(200);

            // delete seniorCenters[0]._id;
            // delete seniorCenters[1]._id;
            // expect(res.body[0]).to.deep.include(seniorCenters[0]);
            // expect(res.body[1]).to.deep.include(seniorCenters[1]);
        });
    });

    describe('GET /api/seniorCenters/:id', function() {
        it('it should get a specific seniorCenter', async () => {
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
                .post('/api/seniorCenters/')
                .set('Authorization', token)
                .send(seniorCenters[0]);

            const id = res3.body._id;
            const res4 = await chai
                .request(require('../../../../server'))
                .get('/api/seniorCenters/' + id)
                .set('Authorization', token);
            expectNoErrors(res4);
            expect(res4).to.have.status(200);
            expect(res4.body).to.deep.include(seniorCenters[0]);
        });
    });

    describe('DELETE /api/seniorCenters/:id', function() {
        it('it should delete a specific seniorCenter', async () => {
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
                .post('/api/seniorCenters/')
                .set('Authorization', token)
                .send(seniorCenters[0]);

            const id = res3.body._id;
            const res4 = await chai
                .request(require('../../../../server'))
                .delete('/api/seniorCenters/' + id)
                .set('Authorization', token);

            expectNoErrors(res4);
            expect(res4).to.have.status(200);
            expect(res4.body).to.deep.include(seniorCenters[0]);
        });
    });
};

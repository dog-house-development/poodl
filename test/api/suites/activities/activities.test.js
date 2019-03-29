const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./activities');
const activities = DATA.activities;
const activity1 = activities[0];
const ADMIN_DATA = require('../admins/admins');
const admins = ADMIN_DATA.admins;

module.exports = function() {
    describe('POST /api/activities/', function() {
        it('should add a new activity', async () => {
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
                .post('/api/activities/')
                .set('Authorization', token)
                .send(activities[0]);

            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            expect(res3.body).to.deep.include(activities[0]);
        });
    });

    describe('POST /api/activities/filter', function() {
        //beforeEach(() => mongoUnit.initDb(process.env.MONGODB_URI, DATA));

        it('should get all activities', async () => {
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
                .post('/api/activities/filter')
                .set('Authorization', token)
                .send();

            expectNoErrors(res3);
            expect(res3).to.have.status(200);
            // delete activities[0]._id;
            // delete activities[1]._id;
            // expect(res3.body[0]).to.deep.include(activities[0]);
            // expect(res3.body[1]).to.deep.include(activities[1]);
        });
    });

    describe('GET /api/activities/:id', function() {
        it('it should get a specific activity', async () => {
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
                .post('/api/activities/')
                .set('Authorization', token)
                .send(activities[0]);

            const id = res3.body._id;
            const res4 = await chai
                .request(require('../../../../server'))
                .get('/api/activities/' + id)
                .set('Authorization', token);
            expectNoErrors(res4);
            expect(res4).to.have.status(200);
            expect(res4.body).to.deep.include(activities[0]);
        });
    });

    describe('DELETE /api/activities/:id', function() {
        it('it should delete a specific activity', async () => {
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
                .post('/api/activities/')
                .set('Authorization', token)
                .send(activities[0]);

            const id = res3.body._id;
            const res4 = await chai
                .request(require('../../../../server'))
                .delete('/api/activities/' + id)
                .set('Authorization', token);

            expectNoErrors(res4);
            expect(res4).to.have.status(200);
            expect(res4.body).to.deep.include(activities[0]);
        });
    });
};

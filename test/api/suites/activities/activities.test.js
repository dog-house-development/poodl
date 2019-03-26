const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./activities');
const activities = DATA.activities;
const activity1 = activities[0];

module.exports = function() {
    describe('POST /api/activities/', function() {
        it('should add a new activity', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/activities/')
                .send(activities[0]);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(activities[0]);
        });
    });

    describe('POST /api/activities/filter', function() {
        beforeEach(() => mongoUnit.initDb(process.env.MONGODB_URI, DATA));

        it('should get all activities', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/activities/filter')
                .send();

            expectNoErrors(res);
            expect(res).to.have.status(200);
            delete activities[0]._id;
            delete activities[1]._id;
            expect(res.body[0]).to.deep.include(activities[0]);
            expect(res.body[1]).to.deep.include(activities[1]);
        });
    });

    describe('GET /api/activities/:id', function() {
        it('it should get a specific activity', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/activities/')
                .send(activities[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).get('/api/activities/' + id);
            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(activities[0]);
        });
    });

    describe('DELETE /api/activities/:id', function() {
        it('it should delete a specific activity', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/activities/')
                .send(activities[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).delete('/api/activities/' + id);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(activities[0]);
        });
    });
};

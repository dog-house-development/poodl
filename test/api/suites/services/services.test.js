const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./services');
const services = DATA.services;
const service1 = services[0];

module.exports = function() {
    describe('POST /api/services/', function() {
        it('should add a new service', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/services/')
                .send(services[0]);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(services[0]);
        });
    });

    describe('POST /api/services/filter', function() {
        beforeEach(() => mongoUnit.initDb(process.env.MONGODB_URI, DATA));

        it('should get all services', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/services/filter')
                .send();

            expectNoErrors(res);
            expect(res).to.have.status(200);
            delete services[0]._id;
            delete services[1]._id;
            expect(res.body[0]).to.deep.include(services[0]);
            expect(res.body[1]).to.deep.include(services[1]);
        });
    });

    describe('GET /api/services/:id', function() {
        it('it should get a specific service', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/services/')
                .send(services[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).get('/api/services/' + id);
            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(services[0]);
        });
    });

    describe('DELETE /api/services/:id', function() {
        it('it should delete a specific service', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/services/')
                .send(services[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).delete('/api/services/' + id);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(services[0]);
        });
    });
};

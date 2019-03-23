const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./seniorCenters');
const seniorCenters = DATA.seniorCenters;
const seniorCenter1 = seniorCenters[0];

module.exports = function() {
    describe('POST /api/seniorCenters/', function() {
        it('should add a new seniorCenter', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/seniorCenters/')
                .send(seniorCenters[0]);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(seniorCenters[0]);
        });
    });

    describe('POST /api/seniorCenters/filter', function() {
        beforeEach(() => mongoUnit.initDb(process.env.MONGODB_URI, DATA));

        it('should get all seniorCenters', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/seniorCenters/filter')
                .send();
            expectNoErrors(res);
            expect(res).to.have.status(200);

            delete seniorCenters[0]._id;
            delete seniorCenters[1]._id;
            expect(res.body[0]).to.deep.include(seniorCenters[0]);
            expect(res.body[1]).to.deep.include(seniorCenters[1]);
        });
    });

    describe('GET /api/seniorCenters/:id', function() {
        it('it should get a specific seniorCenter', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/seniorCenters/')
                .send(seniorCenters[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).get('/api/seniorCenters/' + id);
            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(seniorCenters[0]);
        });
    });

    describe('DELETE /api/seniorCenters/:id', function() {
        it('it should delete a specific seniorCenter', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/seniorCenters/')
                .send(seniorCenters[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).delete('/api/seniorCenters/' + id);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(seniorCenters[0]);
        });
    });
};

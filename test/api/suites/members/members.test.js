const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoUnit = require('mongo-unit');

const expectNoErrors = require('../../utils/expectNoErrors');
const DATA = require('./members');
const members = DATA.members;
const member1 = members[0];

module.exports = function() {
    describe('POST /api/members/', function() {
        it('should add a new member', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/members/')
                .send(members[0]);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(members[0]);
        });
    });

    describe('POST /api/members/filter', function() {
        beforeEach(() => mongoUnit.initDb(process.env.MONGODB_URI, DATA));

        it('should get all members', async () => {
            const res = await chai
                .request(require('../../../../server'))
                .post('/api/members/filter')
                .send();

            expectNoErrors(res);
            expect(res).to.have.status(200);
            delete members[0]._id;
            delete members[1]._id;
            expect(res.body[0]).to.deep.include(members[0]);
            expect(res.body[1]).to.deep.include(members[1]);
        });
    });

    describe('GET /api/members/:id', function() {
        it('it should get a specific member', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/members/')
                .send(members[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).get('/api/members/' + id);
            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(members[0]);
        });
    });

    describe('DELETE /api/members/:id', function() {
        it('it should delete a specific member', async () => {
            const res1 = await chai
                .request(require('../../../../server'))
                .post('/api/members/')
                .send(members[0]);

            const id = res1.body._id;
            const res = await chai.request(require('../../../../server')).delete('/api/members/' + id);

            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(members[0]);
        });
    });
};

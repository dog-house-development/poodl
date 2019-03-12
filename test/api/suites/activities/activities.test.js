const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const mongoUnit = require('mongo-unit');
const testMongoUrl = process.env.MONGODB_URI;

chai.use(chaiHttp);

module.exports = function() {
    describe('/api/activities/add', function() {
        const testData = require('./testData.json');
        beforeEach(() => mongoUnit.initDb(testMongoUrl, testData));
        afterEach(() => mongoUnit.drop());

        it.only('it should add a new activity', async () => {
            // const testData = require('./testData.json');
            //console.log('before');
            //await mongoUnit.initDb(testMongoUrl); //, testData);
            //console.log('after');
            let testActivity1 = {
                seniorCenter: '5c75f99fe7179a3e36ddee5b',
                name: 'test6',
                description: 't',
                startDate: '2019-03-10T07:34:00.000Z',
                endDate: '2019-03-12T19:34:00.000Z'
            };

            let testActivity2 = {
                seniorCenter: '5c75f99fe7179a3e36ddee5b',
                name: 'test6',
                description: 't',
                startDate: '2019-03-10T07:34:00.000Z',
                endDate: '2019-03-12T19:34:00.000Z'
            };

            return chai
                .request(server)
                .post('/api/activities/add')
                .send(testActivity1)
                .then(res => {
                    expect(res).to.have.status(1000);
                });

            const thing = await chai
                .request(server)
                .post('/api/activities/add')
                .send(testActivity2);
            // .then(function(res) {
            //     console.log(res.body);
            //     console.log('before');
            //     expect(res).to.have.status(1000);
            //     console.log('after');
            //     res.should.have.status(10000);
            //     res.body.should.have.property('_id');
            //     res.body.should.have.property('name').eql('skiing');
            //     res.body.should.have.property('description').eql('10AM-12PM');
            //     res.body.should.have.property('startDate').eql('6 Hours');
            //     res.body.should.have.property('endDate').eql('Sunday');
            //     res.body.should.have.property('admins').eql(['11234']);
            //     res.body.should.have.property('members').eql(['Karin']);
            //     res.body.should.have.property('seniorCenter').eql('5c75f99fe7179a3e36ddee5b');
            // });
            //console.log(thing);
            thing.body.name.should.equal('test5');
            return thing;
        });
    });

    describe('/api/activities/get', function() {
        var tempId = '';
        it('it should get all activities', done => {
            chai.request(server)
                .get('/api/activities/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('success').eql(true);
                    tempId = res.body.data[0]._id;
                    res.body.data[1].should.have.property('_id');
                    res.body.data[1].should.have.property('name').eql('skiing');
                    res.body.data[1].should.have.property('time').eql('10AM-12PM');
                    res.body.data[1].should.have.property('duration').eql('6 Hours');
                    res.body.data[1].should.have.property('date').eql('Sunday');
                    res.body.data[1].should.have.property('admins').eql(['11234']);
                    res.body.data[1].should.have.property('volunteers').eql(['The Dude']);
                    res.body.data[1].should.have.property('members').eql(['Karin']);
                    res.body.data[1].should.have.property('seniorCenter').eql('Good one');

                    res.body.data[0].should.have.property('name').eql('ice climbing');
                    res.body.data[0].should.have.property('time').eql('10AM-12PM');
                    res.body.data[0].should.have.property('duration').eql('2 Hours');
                    res.body.data[0].should.have.property('date').eql('Saturday');
                    res.body.data[0].should.have.property('admins').eql(['Bill']);
                    res.body.data[0].should.have.property('volunteers').eql(['Sandy']);
                    res.body.data[0].should.have.property('members').eql(['Peepsuuu']);
                    res.body.data[0].should.have.property('seniorCenter').eql('The one around the corner');
                    done();
                });
        });

        it('it should get a specific activity', done => {
            chai.request(server)
                .get('/api/activities/get/' + tempId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('name').eql('ice climbing');
                    res.body.should.have.property('time').eql('10AM-12PM');
                    res.body.should.have.property('duration').eql('2 Hours');
                    res.body.should.have.property('date').eql('Saturday');
                    res.body.should.have.property('admins').eql(['Bill']);
                    res.body.should.have.property('volunteers').eql(['Sandy']);
                    res.body.should.have.property('members').eql(['Peepsuuu']);
                    res.body.should.have.property('seniorCenter').eql('The one around the corner');
                    done();
                });
        });
    });

    describe('/api/activities/filter', function() {
        it('it should filter activities', done => {
            let request = {
                seniorCenter: 'The one around the corner'
            };
            chai.request(server)
                .post('/api/activities/filter')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data[0].should.have.property('name').eql('ice climbing');
                    res.body.data[0].should.have.property('time').eql('10AM-12PM');
                    res.body.data[0].should.have.property('duration').eql('2 Hours');
                    res.body.data[0].should.have.property('date').eql('Saturday');
                    res.body.data[0].should.have.property('admins').eql(['Bill']);
                    res.body.data[0].should.have.property('volunteers').eql(['Sandy']);
                    res.body.data[0].should.have.property('members').eql(['Peepsuuu']);
                    res.body.data[0].should.have.property('seniorCenter').eql('The one around the corner');
                    done();
                });
        });
    });

    describe('/api/activities/delete/', function() {
        it('it should delete a specific activity', done => {
            chai.request(server)
                .delete('/api/activities/delete/' + tempId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
};

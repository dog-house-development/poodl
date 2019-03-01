process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');

let Mockgoose = require('mockgoose').Mockgoose;
let mockgoose = new Mockgoose(mongoose);

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

before(function(done) {
    mockgoose.prepareStorage().then(function() {
        mongoose.connect(
            'mongodb://example.com/TestingDB',
            { useNewUrlParser: true },
            function(err) {
                done(err);
            }
        );
    });
});

after(function() {
    process.exit(0);
});

describe('Activities suite /ADD./GET, /GET/:ID,/DELETE', () => {
    it('it should add a new service', done => {
        let testActivity = {
            name: 'ice climbing',
            times: '10AM-12PM',
            dates: 'Saturday',
            admins: 'Bill',
            volunteers: 'Sandy',
            members: 'Peepsuuu',
            seniorCenter: 'The one around the corner'
        };

        chai.request(server)
            .post('/api/activities/add')
            .send(testActivity)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name').eql('ice climbing');
                //res.body.should.have.property('times').eql('10AM-12PM');
                //res.body.should.have.property('dates').eql('Saturday');
                //res.body.should.have.property('admins').eql('Bill');
                //res.body.should.have.property('volunteers').eql('Sandy');
                //res.body.should.have.property('members').eql('Peepsuuu');
                //res.body.should.have.property('seniorCenter').eql('The one around the corner');
                done();
            });
    });
    var tempId = '';
    it('it should get all activities', done => {
        chai.request(server)
            .get('/api/activities/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[0]._id;
                done();
            });
    });

    it('it should get a specific activity', done => {
        chai.request(server)
            .get('/api/activities/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should delete a specific activity', done => {
        chai.request(server)
            .delete('/api/activities/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

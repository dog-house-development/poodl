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

describe('Services suite /ADD./GET, /GET/:ID,/DELETE', () => {
    it('it should add a new service', done => {
        let testService = {
            name: 'ice climbing',
            time: '10AM-12PM',
            duration: '2 Hours',
            date: 'Saturday',
            admins: 'Bill',
            volunteers: 'Sandy',
            members: 'Peepsuuu',
            seniorCenter: 'The one around the corner'
        };

        chai.request(server)
            .post('/api/services/add')
            .send(testService)
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
    });
    var tempId = '';
    it('it should get all services', done => {
        chai.request(server)
            .get('/api/services/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[0]._id;
                done();
            });
    });

    it('it should get a specific service', done => {
        chai.request(server)
            .get('/api/services/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should filter services', done => {
        let request = {
            seniorCenter: 'The one around the corner'
        };
        chai.request(server)
            .post('/api/services/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should delete a specific service', done => {
        chai.request(server)
            .delete('/api/services/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

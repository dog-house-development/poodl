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

describe('SeniorCenter API suite /ADD,/GET,/GET/:ID, /DELETE', () => {
    it('it should add a seniorCenter', done => {
        var center = {
            name: 'deep puddle',
            email: 'ThisPuddleIsSoDeep@gmail.com',
            address: 'Hole in the ground',
            phone: '818-WATER',
            operationHours: '24 Hours'
        };
        chai.request(server)
            .post('/api/seniorCenters/add')
            .send(center)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    var tempId = '';
    it('it should get all the seniorCenters', done => {
        chai.request(server)
            .get('/api/seniorCenters/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[0]._id;
                done();
            });
    });

    it('it should get a specific seniorCenter', done => {
        chai.request(server)
            .get('/api/seniorCenters/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should delete a specific seniorCenter', done => {
        chai.request(server)
            .delete('/api/seniorCenters/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

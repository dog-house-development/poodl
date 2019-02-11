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
    //process.exit(0);
});

describe('SeniorCenter /ADD api', () => {
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
});

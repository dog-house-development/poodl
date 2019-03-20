process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const SeniorCenter = mongoose.model('SeniorCenter');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

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
        let center1 = new SeniorCenter({
            name: 'deep puddle',
            email: 'ThisPuddleIsSoDeep@gmail.com',
            address: 'Hole in the ground',
            phone: '818-WATER',
            operationHours: '24 Hours'
        });
        let center2 = new SeniorCenter({
            name: 'Snow',
            email: 'So Cold',
            address: 'Outside',
            phone: 'Freeze',
            operationHours: 'Always'
        });
        chai.request(server)
            .post('/api/seniorCenters/add')
            .send(center2)
            .end();
        chai.request(server)
            .post('/api/seniorCenters/add')
            .send(center1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name').eql('deep puddle');
                res.body.should.have.property('email').eql('ThisPuddleIsSoDeep@gmail.com');
                res.body.should.have.property('address').eql('Hole in the ground');
                res.body.should.have.property('phone').eql('818-WATER');
                res.body.should.have.property('operationHours').eql('24 Hours');
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
                tempId = res.body.data[1]._id;
                res.body.data[1].should.have.property('name').eql('deep puddle');
                res.body.data[1].should.have.property('email').eql('ThisPuddleIsSoDeep@gmail.com');
                res.body.data[1].should.have.property('address').eql('Hole in the ground');
                res.body.data[1].should.have.property('phone').eql('818-WATER');
                res.body.data[1].should.have.property('operationHours').eql('24 Hours');
                done();
            });
    });

    it('it should get a specific seniorCenter', done => {
        chai.request(server)
            .get('/api/seniorCenters/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name').eql('deep puddle');
                res.body.should.have.property('email').eql('ThisPuddleIsSoDeep@gmail.com');
                res.body.should.have.property('address').eql('Hole in the ground');
                res.body.should.have.property('phone').eql('818-WATER');
                res.body.should.have.property('operationHours').eql('24 Hours');
                done();
            });
    });

    it('it should filter seniorCenters', done => {
        let request = {
            phone: '818-WATER',
            page: 0,
            pageSize: 1
        };
        chai.request(server)
            .post('/api/seniorCenters/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data[0].should.have.property('name').eql('deep puddle');
                res.body.data[0].should.have.property('email').eql('ThisPuddleIsSoDeep@gmail.com');
                res.body.data[0].should.have.property('address').eql('Hole in the ground');
                res.body.data[0].should.have.property('phone').eql('818-WATER');
                res.body.data[0].should.have.property('operationHours').eql('24 Hours');
                done();
            });
    });

    it('it should edit a seniorCenter given its id', done => {
        let request = {
            operationHours: 'New Ones'
        };
        chai.request(server)
            .post('/api/seniorCenters/edit/' + tempId)
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name').eql('deep puddle');
                res.body.should.have.property('email').eql('ThisPuddleIsSoDeep@gmail.com');
                res.body.should.have.property('address').eql('Hole in the ground');
                res.body.should.have.property('phone').eql('818-WATER');
                res.body.should.have.property('operationHours').eql('New Ones');
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

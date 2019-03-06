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

describe('Volunteer API suite /ADD,/GET,/GET/:ID, /DELETE', () => {
    it('it should add a volunteer', done => {
        const testVolunteer1 = {
            firstName: 'Charles',
            lastName: 'Boyle',
            email: 'JakeFAN123@gmail.com',
            seniorCenter: 'center'
        };
        const testVolunteer2 = {
            firstName: 'Dorian',
            lastName: 'Antipa',
            email: 'bassoon@bassoonman.com',
            seniorCenter: 'Howard'
        };

        chai.request(server)
            .post('/api/volunteers/add')
            .send(testVolunteer2)
            .end((err, res) => {});

        chai.request(server)
            .post('/api/volunteers/add')
            .send(testVolunteer1)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    var tempId = '';
    it('it should get all the volunteers', done => {
        chai.request(server)
            .get('/api/volunteers/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[0]._id;
                res.body.should.have.property('success').eql(true);
                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('Dorian');
                res.body.data[0].should.have.property('lastName').eql('Antipa');
                res.body.data[0].should.have.property('email').eql('bassoon@bassoonman.com');
                res.body.data[0].should.have.property('createdAt');
                res.body.data[0].should.have.property('updatedAt');
                done();
            });
    });

    it('it should get a specific volunteer', done => {
        chai.request(server)
            .get('/api/volunteers/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('Dorian');
                res.body.should.have.property('lastName').eql('Antipa');
                res.body.should.have.property('email').eql('bassoon@bassoonman.com');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done();
            });
    });

    it('it should get a list of volunteers', done => {
        let idList = {
            _id: ['"' + tempId + '"']
        };
        chai.request(server)
            .post('/api/volunteers/get')
            .send(idList)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('Dorian');
                res.body.data[0].should.have.property('lastName').eql('Antipa');
                res.body.data[0].should.have.property('email').eql('bassoon@bassoonman.com');
                res.body.data[0].should.have.property('createdAt');
                res.body.data[0].should.have.property('updatedAt');
                done();
            });
    });

    it('it should filter volunteers', done => {
        let request = {
            firstName: 'Charles'
        };
        chai.request(server)
            .post('/api/volunteers/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.data[0].should.have.property('_id');
                res.body.data[1].should.have.property('firstName').eql('Charles');
                res.body.data[1].should.have.property('lastName').eql('Boyle');
                res.body.data[1].should.have.property('email').eql('JakeFAN123@gmail.com');
                res.body.data[1].should.have.property('createdAt');
                res.body.data[1].should.have.property('updatedAt');
                done();
            });
    });

    it('it should delete a specific volunteer', done => {
        chai.request(server)
            .delete('/api/volunteers/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

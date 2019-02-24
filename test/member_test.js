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

describe('Members suite /ADD,/GET,/GET/:ID,/EDIT/:ID, /EDIT,/DELETE', () => {
    it('it should add a new member', done => {
        let testMember = {
            firstName: 'Charles',
            lastName: 'Boile',
            email: 'SpecialDiet2@gmail.com',
            address: 'Brooklyn 99',
            seniorCenter: 'Nice little place',
            membershipDate: 'Frever',
            renewalDate: 'Today',
            specialDiet: ['fish', 'chicken nuggets']
        };

        chai.request(server)
            .post('/api/members/add')
            .send(testMember)
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
    });
    var tempId = '';
    it('it should get all members', done => {
        chai.request(server)
            .get('/api/members/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[0]._id;
                done();
            });
    });

    it('it should get a specific member', done => {
        chai.request(server)
            .get('/api/members/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should edit a specific member by ID', done => {
        let testMember1 = {
            email: 'SpecialDiet3@gmail.com'
        };
        chai.request(server)
            .post('/api/members/edit/' + tempId)
            .send(testMember1)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should edit a specific member by Name', done => {
        let testMember2 = {
            firstName: 'Charles',
            lastName: 'Boile',
            email: 'SpecialDiet4@gmail.com'
        };
        chai.request(server)
            .post('/api/members/edit')
            .send(testMember2)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should delete a specific member', done => {
        chai.request(server)
            .delete('/api/members/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

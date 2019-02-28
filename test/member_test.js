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
        let testMember1 = {
            firstName: 'Charles',
            lastName: 'Boile',
            email: 'SpecialDiet2@gmail.com',
            address: 'Brooklyn 99',
            seniorCenter: 'Nice little place',
            membershipDate: 'Frever',
            renewalDate: 'Today',
            specialDiet: ['fish', 'chicken nuggets']
        };

        let testMember2 = {
            firstName: 'Karen',
            lastName: 'Engel',
            email: 'KarenEngel@gmail.com',
            address: '123 4th Avenue',
            seniorCenter: 'Highgate',
            membershipDate: 'Frever',
            renewalDate: '02-03-2020',
            specialDiet: ['beef', 'chicken nuggets']
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
                res.body.should.have.property('data');
                member1ID = res.body.data[1]._id;
                member2ID = res.body[0]._id;

                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('firstName').eql('Charles');
                res.body.data[1].should.have.property('lastName').eql('Boile');
                res.body.data[1].should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.data[1].should.have.property('address').eql('Brooklyn 99');
                res.body.data[1].should.have.property('seniorCenter').eql('Nice little place');
                res.body.data[1].should.have.property('membershipDate').eql('Frever');
                res.body.data[1].should.have.property('renewalDate').eql('Today');
                res.body.data[1].should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);
                res.body.data[0].should.have.property('date');

                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('firstName').eql('Karen');
                res.body.data[1].should.have.property('lastName').eql('Engel');
                res.body.data[1].should.have.property('email').eql('KarenEngel@gmail.com');
                res.body.data[1].should.have.property('address').eql('123 4th Avenue');
                res.body.data[1].should.have.property('seniorCenter').eql('Highgate');
                res.body.data[1].should.have.property('membershipDate').eql('Frever');
                res.body.data[1].should.have.property('renewalDate').eql('02-03-2020');
                res.body.data[1].should.have.property('specialDiet').eql(['beef', 'chicken nuggets']);
                res.body.data[0].should.have.property('date');

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

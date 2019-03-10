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

describe('Volunteers suite /ADD,/GET,/GET/:ID,/EDIT/:ID, /EDIT,/DELETE', () => {
    it('it should add a new volunteer', done => {
        let testVolunteer1 = {
            firstName: 'Charles',
            lastName: 'Boile',
            email: 'SpecialDiet2@gmail.com',
            seniorCenter: 'Nice little place'
        };

        let testVolunteer2 = {
            firstName: 'Karen',
            lastName: 'Engel',
            email: 'KarenEngel@gmail.com',
            seniorCenter: 'Highgate'
        };

        chai.request(server)
            .post('/api/volunteers/add')
            .send(testVolunteer2)
            .end();

        chai.request(server)
            .post('/api/volunteers/add')
            .send(testVolunteer1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('Charles');
                res.body.should.have.property('lastName').eql('Boile');
                res.body.should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.should.have.property('seniorCenter').eql('Nice little place');

                done();
            });
    });
    var tempId = '';
    it('it should get all volunteers', done => {
        chai.request(server)
            .get('/api/volunteers/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[1]._id;
                res.body.should.have.property('data');

                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('firstName').eql('Charles');
                res.body.data[1].should.have.property('lastName').eql('Boile');
                res.body.data[1].should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.data[1].should.have.property('seniorCenter').eql('Nice little place');

                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('Karen');
                res.body.data[0].should.have.property('lastName').eql('Engel');
                res.body.data[0].should.have.property('email').eql('KarenEngel@gmail.com');
                res.body.data[0].should.have.property('seniorCenter').eql('Highgate');

                done();
            });
    });

    it('it should get a specific volunteer by ID', done => {
        chai.request(server)
            .get('/api/volunteers/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.property('data');
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('Charles');
                res.body.should.have.property('lastName').eql('Boile');
                res.body.should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.should.have.property('seniorCenter').eql('Nice little place');

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
                done();
            });
    });

    it('it should filter list of volunteers', done => {
        let request = {
            firstName: 'Karen'
        };
        chai.request(server)
            .post('/api/volunteers/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('firstName').eql('Karen');
                res.body.data[0].should.have.property('lastName').eql('Engel');
                res.body.data[0].should.have.property('email').eql('KarenEngel@gmail.com');
                res.body.data[0].should.have.property('seniorCenter').eql('Highgate');
                done();
            });
    });

    it('it should edit a volunteers by their id', done => {
        let request = {
            seniorCenter: 'New One'
        };
        chai.request(server)
            .post('/api/volunteers/edit/' + tempId)
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('firstName').eql('Charles');
                res.body.should.have.property('lastName').eql('Boile');
                res.body.should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.should.have.property('seniorCenter').eql('New One');
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

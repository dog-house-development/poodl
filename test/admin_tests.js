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

describe('Admin API suite /GET,/REGISTER,/GET/:ID,/LOGIN,/DELETE admins', () => {
    it('it should create a new admin', done => {
        var admin = {
            firstName: 'testy',
            lastName: 'boy',
            email: 'test@gmail.com',
            password: 'greatpassword1!@',
            password2: 'greatpassword1!@',
            seniorCenter: 'test center',
            superAdmin: true
        };

        chai.request(server)
            .post('/api/admins/register')
            .send(admin)
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
    });

    it('it should login an existing admin', done => {
        let loginInfo = {
            email: 'test@gmail.com',
            password: 'greatpassword1!@'
        };
        chai.request(server)
            .post('/api/admins/login')
            .send(loginInfo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);

                done();
            });
    });
    var tempId = '';
    it('it should get all the admins', done => {
        chai.request(server)
            .get('/api/admins/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[0]._id;
                done();
            });
    });

    it('it should get a specific admin', done => {
        chai.request(server)
            .get('/api/admins/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should get a list of admins', done => {
        let idList = {
            _id: ['"' + tempId + '"']
        };
        chai.request(server)
            .post('/api/admins/get')
            .send(idList)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should filter list of admins', done => {
        let request = {
            seniorCenter: 'test center'
        };
        chai.request(server)
            .post('/api/admins/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should delete a specific admin', done => {
        chai.request(server)
            .delete('/api/admins/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

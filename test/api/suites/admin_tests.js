const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

module.exports = function() {
    it('it should create a new admin', done => {
        const admin1 = {
            firstName: 'testy',
            lastName: 'boy',
            email: 'test@gmail.com',
            password: 'greatpassword1!@',
            password2: 'greatpassword1!@',
            seniorCenter: 'test center',
            superAdmin: true
        };

        const admin2 = {
            firstName: 'testy',
            lastName: 'boy2',
            email: 'test2@gmail.com',
            password: 'greatpassword2!@',
            password2: 'greatpassword2!@',
            seniorCenter: 'test center2'
        };

        chai.request(server)
            .post('/api/admins/register')
            .send(admin2)
            .end();

        chai.request(server)
            .post('/api/admins/register')
            .send(admin1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('testy');
                res.body.should.have.property('lastName').eql('boy');
                res.body.should.have.property('email').eql('test@gmail.com');
                res.body.should.have.property('seniorCenter').eql('test center');
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
                res.body.should.have.property('token');

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
                tempId = res.body.data[1]._id;
                res.body.should.have.property('data');
                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('firstName').eql('testy');
                res.body.data[1].should.have.property('lastName').eql('boy');
                res.body.data[1].should.have.property('email').eql('test@gmail.com');
                res.body.data[1].should.have.property('password');
                res.body.data[1].should.have.property('superAdmin').eql(true);
                res.body.data[1].should.have.property('seniorCenter').eql('test center');

                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('testy');
                res.body.data[0].should.have.property('lastName').eql('boy2');
                res.body.data[0].should.have.property('email').eql('test2@gmail.com');
                res.body.data[0].should.have.property('password');
                res.body.data[0].should.have.property('superAdmin').eql(false);
                res.body.data[0].should.have.property('seniorCenter').eql('test center2');

                done();
            });
    });

    it('it should get a specific admin', done => {
        chai.request(server)
            .get('/api/admins/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.property('data');
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('testy');
                res.body.should.have.property('lastName').eql('boy');
                res.body.should.have.property('email').eql('test@gmail.com');
                res.body.should.have.property('seniorCenter').eql('test center');
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
                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('testy');
                res.body.data[0].should.have.property('lastName').eql('boy2');
                res.body.data[0].should.have.property('email').eql('test2@gmail.com');
                res.body.data[0].should.have.property('password');
                res.body.data[0].should.have.property('superAdmin').eql(false);
                res.body.data[0].should.have.property('seniorCenter');
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
};

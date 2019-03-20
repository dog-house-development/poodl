process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
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
        const admin1 = new Admin({
            firstName: 'testy',
            lastName: 'boy',
            email: 'test@gmail.com',
            password: 'greatpassword1!@',
            password2: 'greatpassword1!@',
            accessLevel: 'Volunteer',
            seniorCenterId: '5c78d41c24952d2828f880ea',
            middleInitial: 'L',
            streetAddress: '123 This Street',
            city: 'Bozeman',
            state: 'MT',
            zip: 59715,
            homePhone: 8188549090,
            cellPhone: 1234567890,
            howOften: '5 hours',
            houseMaintenanceAndRepairs: 'Carpentry',
            references: 'My Father',
            learnAboutVolunteerProgram: 'Other'
        });

        const admin2 = new Admin({
            firstName: 'testy2',
            lastName: 'boy2',
            email: 'test2@gmail.com',
            password: 'greatpassword2!@',
            password2: 'greatpassword2!@',
            accessLevel: 'Admin',
            seniorCenterId: '5c78d41c24952d2828f880ea'
        });

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
                res.body.should.have.property('seniorCenterId');
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
                tempId = res.body.data[0]._id;
                //console.log(res.body.data[1]);
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('testy');
                res.body.data[0].should.have.property('lastName').eql('boy');
                res.body.data[0].should.have.property('email').eql('test@gmail.com');
                res.body.data[0].should.have.property('seniorCenterId');
                // //
                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('firstName').eql('testy2');
                res.body.data[1].should.have.property('lastName').eql('boy2');
                res.body.data[1].should.have.property('email').eql('test2@gmail.com');
                res.body.data[1].should.have.property('seniorCenterId');

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
                res.body.should.have.property('seniorCenterId');
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
            firstName: 'testy2',
            page: 0,
            pageSize: 1
        };
        chai.request(server)
            .post('/api/admins/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('testy2');
                res.body.data[0].should.have.property('lastName').eql('boy2');
                res.body.data[0].should.have.property('email').eql('test2@gmail.com');
                res.body.data[0].should.have.property('password');
                done();
            });
    });

    it('it should edit a specific admin by id', done => {
        let request = {
            city: 'Agoura'
        };
        chai.request(server)
            .post('/api/admins/edit/' + tempId)
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.property('data');
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('testy');
                res.body.should.have.property('lastName').eql('boy');
                res.body.should.have.property('email').eql('test@gmail.com');
                res.body.should.have.property('city').eql('Agoura');
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

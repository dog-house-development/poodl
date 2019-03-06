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

describe('Services suite /ADD./GET, /GET/:ID,/DELETE', () => {
    it('it should add a new service', done => {
        let testService1 = {
            name: 'ice climbing',
            time: '10AM-12PM',
            duration: '2 Hours',
            date: 'Saturday',
            admins: 'Bill',
            volunteers: 'Sandy',
            members: 'Peepsuuu',
            seniorCenter: 'The one around the corner'
        };
        let testService2 = {
            name: 'skiing',
            time: '10AM-12PM',
            duration: '6 Hours',
            date: 'Sunday',
            admins: '11234',
            volunteers: 'The Dude',
            members: 'Karin',
            seniorCenter: 'Good one'
        };

        chai.request(server)
            .post('/api/services/add')
            .send(testService1)
            .end();

        chai.request(server)
            .post('/api/services/add')
            .send(testService2)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body.should.have.property('name').eql('skiing');
                res.body.should.have.property('time').eql('10AM-12PM');
                res.body.should.have.property('duration').eql('6 Hours');
                res.body.should.have.property('date').eql('Sunday');
                res.body.should.have.property('admins').eql(['11234']);
                res.body.should.have.property('volunteers').eql(['The Dude']);
                res.body.should.have.property('members').eql(['Karin']);
                res.body.should.have.property('seniorCenter').eql('Good one');
                done();
            });
    });
    var tempId = '';
    it('it should get all services', done => {
        chai.request(server)
            .get('/api/services/get')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                tempId = res.body.data[0]._id;
                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('name').eql('skiing');
                res.body.data[1].should.have.property('time').eql('10AM-12PM');
                res.body.data[1].should.have.property('duration').eql('6 Hours');
                res.body.data[1].should.have.property('date').eql('Sunday');
                res.body.data[1].should.have.property('admins').eql(['11234']);
                res.body.data[1].should.have.property('volunteers').eql(['The Dude']);
                res.body.data[1].should.have.property('members').eql(['Karin']);
                res.body.data[1].should.have.property('seniorCenter').eql('Good one');

                res.body.data[0].should.have.property('name').eql('ice climbing');
                res.body.data[0].should.have.property('time').eql('10AM-12PM');
                res.body.data[0].should.have.property('duration').eql('2 Hours');
                res.body.data[0].should.have.property('date').eql('Saturday');
                res.body.data[0].should.have.property('admins').eql(['Bill']);
                res.body.data[0].should.have.property('volunteers').eql(['Sandy']);
                res.body.data[0].should.have.property('members').eql(['Peepsuuu']);
                res.body.data[0].should.have.property('seniorCenter').eql('The one around the corner');
                done();
            });
    });

    it('it should get a specific service', done => {
        chai.request(server)
            .get('/api/services/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name').eql('ice climbing');
                res.body.should.have.property('time').eql('10AM-12PM');
                res.body.should.have.property('duration').eql('2 Hours');
                res.body.should.have.property('date').eql('Saturday');
                res.body.should.have.property('admins').eql(['Bill']);
                res.body.should.have.property('volunteers').eql(['Sandy']);
                res.body.should.have.property('members').eql(['Peepsuuu']);
                res.body.should.have.property('seniorCenter').eql('The one around the corner');
                done();
            });
    });

    it('it should filter services', done => {
        let request = {
            seniorCenter: 'Good one'
        };
        chai.request(server)
            .post('/api/services/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('name').eql('skiing');
                res.body.data[1].should.have.property('time').eql('10AM-12PM');
                res.body.data[1].should.have.property('duration').eql('6 Hours');
                res.body.data[1].should.have.property('date').eql('Sunday');
                res.body.data[1].should.have.property('admins').eql(['11234']);
                res.body.data[1].should.have.property('volunteers').eql(['The Dude']);
                res.body.data[1].should.have.property('members').eql(['Karin']);
                res.body.data[1].should.have.property('seniorCenter').eql('Good one');
                done();
            });
    });

    it('it should delete a specific service', done => {
        chai.request(server)
            .delete('/api/services/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

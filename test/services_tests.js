process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Service = mongoose.model('Service');

const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

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
describe('Services suite /ADD./GET, /GET/:ID,/DELETE', () => {
    it('it should add a new service', done => {
        let testService1 = new Service({
            name: 'ice climbing',
            seniorCenterId: '5c75f8b1e7179a3e36ddee0e',
            memberId: '5c762192c5d4ccce72a5d914',
            description: 'Example Event'
        });
        let testService2 = new Service({
            name: 'rock climbing',
            seniorCenterId: '5c78d41c24952d2828f880ea',
            memberId: '5c7c5363b275ce42fcb81097',
            description: 'Example Event2'
        });
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
                res.body.should.have.property('name').eql('rock climbing');
                res.body.should.have.property('seniorCenterId').eql('5c78d41c24952d2828f880ea');
                res.body.should.have.property('memberId').eql('5c7c5363b275ce42fcb81097');
                res.body.should.have.property('description').eql('Example Event2');
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
                res.body.data[1].should.have.property('name').eql('rock climbing');
                res.body.data[1].should.have.property('seniorCenterId').eql('5c78d41c24952d2828f880ea');
                res.body.data[1].should.have.property('memberId').eql('5c7c5363b275ce42fcb81097');
                res.body.data[1].should.have.property('description').eql('Example Event2');

                res.body.data[0].should.have.property('name').eql('ice climbing');
                res.body.data[0].should.have.property('seniorCenterId').eql('5c75f8b1e7179a3e36ddee0e');
                res.body.data[0].should.have.property('memberId').eql('5c762192c5d4ccce72a5d914');
                res.body.data[0].should.have.property('description').eql('Example Event');
                done();
            });
    });

    it('it should get a specific service', done => {
        chai.request(server)
            .get('/api/services/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name').eql('ice climbing');
                res.body.should.have.property('seniorCenterId').eql('5c75f8b1e7179a3e36ddee0e');
                res.body.should.have.property('memberId').eql('5c762192c5d4ccce72a5d914');
                res.body.should.have.property('description').eql('Example Event');
                done();
            });
    });

    it('it should filter services', done => {
        let request = {
            description: 'Example Event',
            page: 0,
            pageSize: 1
        };
        chai.request(server)
            .post('/api/services/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.data[0].should.have.property('name').eql('ice climbing');
                res.body.data[0].should.have.property('seniorCenterId').eql('5c75f8b1e7179a3e36ddee0e');
                res.body.data[0].should.have.property('memberId').eql('5c762192c5d4ccce72a5d914');
                res.body.data[0].should.have.property('description').eql('Example Event');
                done();
            });
    });

    it('it should edit a service by the id', done => {
        let request = {
            seniorCenter: 'New One'
        };
        chai.request(server)
            .post('/api/services/edit/' + tempId)
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name').eql('ice climbing');
                res.body.should.have.property('seniorCenterId').eql('5c75f8b1e7179a3e36ddee0e');
                res.body.should.have.property('memberId').eql('5c762192c5d4ccce72a5d914');
                res.body.should.have.property('description').eql('Example Event');
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

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

module.exports = function() {
    it('it should add a seniorCenter', done => {
        const center1 = {
            name: 'deep puddle',
            email: 'ThisPuddleIsSoDeep@gmail.com',
            address: 'Hole in the ground',
            phone: '818-WATER',
            operationHours: '24 Hours'
        };
        const center2 = {
            name: 'Snow',
            email: 'So Cold',
            address: 'Outside',
            phone: 'Freeze',
            operationHours: 'Always'
        };
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
                tempId = res.body.data[0]._id;
                res.body.data[0].should.have.property('name').eql('deep puddle');
                res.body.data[0].should.have.property('email').eql('ThisPuddleIsSoDeep@gmail.com');
                res.body.data[0].should.have.property('address').eql('Hole in the ground');
                res.body.data[0].should.have.property('phone').eql('818-WATER');
                res.body.data[0].should.have.property('operationHours').eql('24 Hours');
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
            phone: '818-WATER'
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

    it('it should delete a specific seniorCenter', done => {
        chai.request(server)
            .delete('/api/seniorCenters/delete/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
};

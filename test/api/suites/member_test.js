const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

module.exports = function() {
    it('it should add a new member', done => {
        let testMember1 = {
            firstName: 'Charles',
            lastName: 'Boile',
            email: 'SpecialDiet2@gmail.com',
            seniorCenter: 'Nice little place',
            address: 'Brooklyn 99',
            renewalDate: 'Today',
            specialDiet: ['fish', 'chicken nuggets']
        };

        let testMember2 = {
            firstName: 'Karen',
            lastName: 'Engel',
            email: 'KarenEngel@gmail.com',
            seniorCenter: 'Highgate',
            address: '123 4th Avenue',
            renewalDate: '02-03-2020',
            specialDiet: ['beef', 'chicken nuggets']
        };

        chai.request(server)
            .post('/api/members/add')
            .send(testMember2)
            .end();

        chai.request(server)
            .post('/api/members/add')
            .send(testMember1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('Charles');
                res.body.should.have.property('lastName').eql('Boile');
                res.body.should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.should.have.property('address').eql('Brooklyn 99');
                res.body.should.have.property('seniorCenter').eql('Nice little place');
                res.body.should.have.property('membershipDate');
                res.body.should.have.property('renewalDate').eql('Today');
                res.body.should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);

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
                tempId = res.body.data[1]._id;
                res.body.should.have.property('data');

                res.body.data[1].should.have.property('_id');
                res.body.data[1].should.have.property('firstName').eql('Charles');
                res.body.data[1].should.have.property('lastName').eql('Boile');
                res.body.data[1].should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.data[1].should.have.property('address').eql('Brooklyn 99');
                res.body.data[1].should.have.property('seniorCenter').eql('Nice little place');
                res.body.data[1].should.have.property('membershipDate');
                res.body.data[1].should.have.property('renewalDate').eql('Today');
                res.body.data[1].should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);

                res.body.data[0].should.have.property('_id');
                res.body.data[0].should.have.property('firstName').eql('Karen');
                res.body.data[0].should.have.property('lastName').eql('Engel');
                res.body.data[0].should.have.property('email').eql('KarenEngel@gmail.com');
                res.body.data[0].should.have.property('address').eql('123 4th Avenue');
                res.body.data[0].should.have.property('seniorCenter').eql('Highgate');
                res.body.data[0].should.have.property('membershipDate');
                res.body.data[0].should.have.property('renewalDate').eql('02-03-2020');
                res.body.data[0].should.have.property('specialDiet').eql(['beef', 'chicken nuggets']);

                done();
            });
    });

    it('it should get a specific member by ID', done => {
        chai.request(server)
            .get('/api/members/get/' + tempId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.property('data');
                res.body.should.have.property('_id');
                res.body.should.have.property('firstName').eql('Charles');
                res.body.should.have.property('lastName').eql('Boile');
                res.body.should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.should.have.property('address').eql('Brooklyn 99');
                res.body.should.have.property('seniorCenter').eql('Nice little place');
                res.body.should.have.property('membershipDate');
                res.body.should.have.property('renewalDate').eql('Today');
                res.body.should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                res.body.should.have.property('disabilities');
                res.body.should.have.property('medicalIssues');

                done();
            });
    });
    it('it should edit a specific member by ID', done => {
        let testMember1 = {
            email: 'SpecialDiet300@gmail.com'
        };
        chai.request(server)
            .post('/api/members/edit/' + tempId)
            .send(testMember1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('email').eql('SpecialDiet300@gmail.com');
                done();
            });
    });
    it('it should edit a specific member by Name', done => {
        let testMember2 = {
            firstName: 'Charles',
            lastName: 'Boile',
            seniorCenter: 'Highgate Living'
        };
        chai.request(server)
            .post('/api/members/edit')
            .send(testMember2)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('seniorCenter').eql('Highgate Living');
                done();
            });
    });

    it('it should get a list of members', done => {
        let idList = {
            _id: ['"' + tempId + '"']
        };
        chai.request(server)
            .post('/api/members/get')
            .send(idList)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should filter list of members', done => {
        let request = {
            firstName: 'Charles'
        };
        chai.request(server)
            .post('/api/members/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('firstName').eql('Charles');
                res.body.data[0].should.have.property('lastName').eql('Boile');
                res.body.data[0].should.have.property('email').eql('SpecialDiet300@gmail.com');
                res.body.data[0].should.have.property('address').eql('Brooklyn 99');
                res.body.data[0].should.have.property('seniorCenter').eql('Highgate Living');
                res.body.data[0].should.have.property('membershipDate');
                res.body.data[0].should.have.property('renewalDate').eql('Today');
                res.body.data[0].should.have.property('specialDiet');
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
};

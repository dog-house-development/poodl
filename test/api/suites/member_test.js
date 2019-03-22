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
            //Contact Info
            email: 'SpecialDiet2@gmail.com',
            address: 'Brooklyn 99',
            phoneNumber: '406-457-4567',
            emergencyContact: ['Sharon Shane', 'Daughter', '405-567-7890'],

            //Member Info
            firstName: 'Charles',
            lastName: 'Boile',
            birthDate: '1950-02-13',
            seniorCenter: 'Nice little place',
            specialDiet: ['fish', 'chicken nuggets'],
            medicalIssues: ['Dementia', 'High Blood Pressure'],
            disabilities: ['someDisability', 'otherDisability'],
            mealPreference: 'Vegan',

            //Membership Info
            membershipDate: '1950-02-13',
            memberisNewOrRenewal: true, //New
            renewalDate: 'Today',
            formOfPayment: true, // Cash
            bankCheckNumber: '',
            includedInEstatePlans: true,
            wantsEstateInfo: false,

            //Demographic Info
            race: 'White',
            ethnicity: 'Non-Hispanic/Latino',
            numberInHousehold: 3,
            isPersonCaregiver: true,
            monthlyIncome: 'Over $3,172',
            isDisabled: false,
            isVeteran: true,
            isSpouse60: true,
            isDisabled60: false,
            caregiver: 'Jamie Pearson',
            grandparent: 'Grandparent',
            needsAADL: ['None'],
            needsIADL: ['None']
        };

        let testMember2 = {
            email: 'RuthEngel@gmail.com',
            address: '123 Bluebird Lane',
            phoneNumber: '406-457-4777',
            emergencyContact: ['Tom Engel', 'Son', '405-575-2342'],

            //Member Info
            firstName: 'Ruth',
            lastName: 'Engel',
            birthDate: '1951-06-15',
            seniorCenter: 'Highgate',
            specialDiet: ['Hummus', 'Ensure'],
            medicalIssues: [''],
            disabilities: ['someDisability2', 'otherDisability2'],
            mealPreference: 'Vegetarian',

            //Membership Info
            membershipDate: '1950-08-15',
            memberisNewOrRenewal: false, //Renewal
            renewalDate: '1950-07-10',
            formOfPayment: false, // Cash
            bankCheckNumber: '34df43sd21df',
            includedInEstatePlans: false,
            wantsEstateInfo: false,

            //Demographic Info
            race: 'African American',
            ethnicity: 'Non-Hispanic/Latino',
            numberInHousehold: 1,
            isPersonCaregiver: false,
            monthlyIncome: 'Under $2,172',
            isDisabled: false,
            isVeteran: false,
            isSpouse60: false,
            isDisabled60: false,
            caregiver: 'Jamie Pearson',
            grandparent: 'Grandparent',
            needsAADL: ['None'],
            needsIADL: ['None']
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

                //Contact Info
                res.body.should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.should.have.property('address').eql('Brooklyn 99');
                res.body.should.have.property('phoneNumber').eql('406-457-4567');
                res.body.should.have.property('emergencyContact').eql(['Sharon Shane', 'Daughter', '405-567-7890']);

                //Member Info
                res.body.should.have.property('firstName').eql('Charles');
                res.body.should.have.property('lastName').eql('Boile');
                res.body.should.have.property('birthDate').eql('1950-02-13');
                res.body.should.have.property('seniorCenter').eql('Nice little place');
                res.body.should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);
                res.body.should.have.property('medicalIssues').eql(['Dementia', 'High Blood Pressure']);
                res.body.should.have.property('disabilities').eql(['someDisability', 'otherDisability']);
                res.body.should.have.property('mealPreference').eql('Vegan');

                //Membership Info
                res.body.should.have.property('membershipDate');
                res.body.should.have.property('memberisNewOrRenewal').eql(true);
                res.body.should.have.property('renewalDate').eql('Today');
                res.body.should.have.property('formOfPayment').eql(true);
                res.body.should.have.property('bankCheckNumber');
                res.body.should.have.property('includedInEstatePlans').eql(true);
                res.body.should.have.property('wantsEstateInfo').eql(false);

                //Demographic Info
                res.body.should.have.property('race').eql('White');
                res.body.should.have.property('ethnicity').eql('Non-Hispanic/Latino');
                res.body.should.have.property('numberInHousehold');
                res.body.should.have.property('isPersonCaregiver').eql(true);
                res.body.should.have.property('monthlyIncome').eql('Over $3,172');
                res.body.should.have.property('isDisabled').eql(false);
                res.body.should.have.property('isVeteran').eql(true);
                res.body.should.have.property('isSpouse60').eql(true);
                res.body.should.have.property('isDisabled60').eql(false);
                res.body.should.have.property('caregiver').eql('Jamie Pearson');
                res.body.should.have.property('grandparent').eql('Grandparent');
                res.body.should.have.property('needsAADL').eql(['None']);
                res.body.should.have.property('needsIADL').eql(['None']);
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
                //Contact Info
                res.body.data[1].should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.data[1].should.have.property('address').eql('Brooklyn 99');
                res.body.data[1].should.have.property('phoneNumber').eql('406-457-4567');
                res.body.data[1].should.have.property('address').eql(['Sharon Shane', 'Daughter', '405-567-7890']);

                //Member Info
                res.body.data[1].should.have.property('firstName').eql('Charles');
                res.body.data[1].should.have.property('lastName').eql('Boile');
                res.body.data[1].should.have.property('birthDate').eql('1950-02-13');
                res.body.data[1].should.have.property('seniorCenter').eql('Nice little place');
                res.body.data[1].should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);
                res.body.data[1].should.have.property('medicalIssues').eql(['Dementia', 'High Blood Pressure']);
                res.body.data[1].should.have.property('disabilities').eql(['someDisability', 'otherDisability']);
                res.body.data[1].should.have.property('mealPreference').eql('Vegan');

                //Membership Info
                res.body.data[1].should.have.property('membershipDate');
                res.body.data[1].should.have.property('memberIsNewOrRenewal').eql(true);
                res.body.data[1].should.have.property('renewalDate').eql('Today');
                res.body.data[1].should.have.property('formOfPayment').eql(true);
                res.body.data[1].should.have.property('bankCheckNumber').eql('');
                res.body.data[1].should.have.property('includedInEstatePlans').eql(true);
                res.body.data[1].should.have.property('wantsEstateInfo').eql(false);

                //Demographic Info
                res.body.data[1].should.have.property('race').eql('White');
                res.body.data[1].should.have.property('ethnicity').eql('Non-Hispanic/Latino');
                res.body.data[1].should.have.property('numberInHousehold').eql(3);
                res.body.data[1].should.have.property('isPersonCaregiver').eql(true);
                res.body.data[1].should.have.property('monthlyIncome').eql('Over $3,172');
                res.body.data[1].should.have.property('isDisabled').eql(false);
                res.body.data[1].should.have.property('isVeteran').eql(true);
                res.body.data[1].should.have.property('isSpouse60').eql(true);
                res.body.data[1].should.have.property('isDisabled60').eql(false);
                res.body.data[1].should.have.property('caregiver').eql('Jamie Pearson');
                res.body.data[1].should.have.property('grandparent').eql('Grandparent');
                res.body.data[1].should.have.property('needsAADL').eql(['None']);
                res.body.data[1].should.have.property('needsIADL').eql(['None']);

                //
                // testMember2 Assertions
                //

                res.body.data[0].should.have.property('_id');
                //Contact Info
                res.body.data[0].should.have.property('email').eql('RuthEngel@gmail.com');
                res.body.data[0].should.have.property('address').eql('123 Bluebird Lane');
                res.body.data[0].should.have.property('phoneNumber').eql('406-457-4777');
                res.body.data[0].should.have.property('address').eql(['Tom Engel', 'Son', '405-575-2342']);

                //Member Info
                res.body.data[0].should.have.property('firstName').eql('Ruth');
                res.body.data[0].should.have.property('lastName').eql('Engel');
                res.body.data[0].should.have.property('birthDate').eql('1951-06-15');
                res.body.data[0].should.have.property('seniorCenter').eql('Highgate');
                res.body.data[0].should.have.property('specialDiet').eql(['Hummus', 'Ensure']);
                res.body.data[0].should.have.property('medicalIssues').eql(['']);
                res.body.data[0].should.have.property('disabilities').eql(['someDisability2', 'otherDisability2']);
                res.body.data[0].should.have.property('mealPreference').eql('Vegetarian');

                //Membership Info
                res.body.data[0].should.have.property('membershipDate');
                res.body.data[0].should.have.property('memberIsNewOrRenewal').eql(false);
                res.body.data[0].should.have.property('renewalDate').eql('1950-07-10');
                res.body.data[0].should.have.property('formOfPayment').eql(false);
                res.body.data[0].should.have.property('bankCheckNumber').eql('34df43sd21df');
                res.body.data[0].should.have.property('includedInEstatePlans').eql(false);
                res.body.data[0].should.have.property('wantsEstateInfo').eql(false);

                //Demographic Info
                res.body.data[0].should.have.property('race').eql('African American');
                res.body.data[0].should.have.property('ethnicity').eql('Non-Hispanic/Latino');
                res.body.data[0].should.have.property('numberInHousehold').eql(1);
                res.body.data[0].should.have.property('isPersonCaregiver').eql(false);
                res.body.data[0].should.have.property('monthlyIncome').eql('Underr $2,172');
                res.body.data[0].should.have.property('isDisabled').eql(false);
                res.body.data[0].should.have.property('isVeteran').eql(false);
                res.body.data[0].should.have.property('isSpouse60').eql(false);
                res.body.data[0].should.have.property('isDisabled60').eql(false);
                res.body.data[0].should.have.property('caregiver').eql('Jamie Pearson');
                res.body.data[0].should.have.property('grandparent').eql('Grandparent');
                res.body.data[0].should.have.property('needsAADL').eql(['None']);
                res.body.data[0].should.have.property('needsIADL').eql(['None']);

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
                //Contact Info
                res.body.should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.should.have.property('address').eql('Brooklyn 99');
                res.body.should.have.property('phoneNumber').eql('406-457-4567');
                res.body.should.have.property('address').eql(['Sharon Shane', 'Daughter', '405-567-7890']);

                //Member Info
                res.body.should.have.property('firstName').eql('Charles');
                res.body.should.have.property('lastName').eql('Boile');
                res.body.should.have.property('birthDate').eql('1950-02-13');
                res.body.should.have.property('seniorCenter').eql('Nice little place');
                res.body.should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);
                res.body.should.have.property('medicalIssues').eql(['Dementia', 'High Blood Pressure']);
                res.body.should.have.property('disabilities').eql(['someDisability', 'otherDisability']);
                res.body.should.have.property('mealPreference').eql('Vegan');

                //Membership Info
                res.body.should.have.property('membershipDate');
                res.body.should.have.property('memberIsNewOrRenewal').eql(true);
                res.body.should.have.property('renewalDate').eql('Today');
                res.body.should.have.property('formOfPayment').eql(true);
                res.body.should.have.property('bankCheckNumber').eql('');
                res.body.should.have.property('includedInEstatePlans').eql(true);
                res.body.should.have.property('wantsEstateInfo').eql(false);

                //Demographic Info
                res.body.should.have.property('race').eql('White');
                res.body.should.have.property('ethnicity').eql('Non-Hispanic/Latino');
                res.body.should.have.property('numberInHousehold').eql(3);
                res.body.should.have.property('isPersonCaregiver').eql(true);
                res.body.should.have.property('monthlyIncome').eql('Over $3,172');
                res.body.should.have.property('isDisabled').eql(false);
                res.body.should.have.property('isVeteran').eql(true);
                res.body.should.have.property('isSpouse60').eql(true);
                res.body.should.have.property('isDisabled60').eql(false);
                res.body.should.have.property('caregiver').eql('Jamie Pearson');
                res.body.should.have.property('grandparent').eql('Grandparent');
                res.body.should.have.property('needsAADL').eql(['None']);
                res.body.should.have.property('needsIADL').eql(['None']);

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
            firstName: 'Charles',
            page: 0,
            pageSize: 1
        };
        chai.request(server)
            .post('/api/members/filter')
            .send(request)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                res.body.data[1].should.have.property('_id');
                //Contact Info
                res.body.data[1].should.have.property('email').eql('SpecialDiet2@gmail.com');
                res.body.data[1].should.have.property('address').eql('Brooklyn 99');
                res.body.data[1].should.have.property('phoneNumber').eql('406-457-4567');
                res.body.data[1].should.have.property('address').eql(['Sharon Shane', 'Daughter', '405-567-7890']);

                //Member Info
                res.body.data[1].should.have.property('firstName').eql('Charles');
                res.body.data[1].should.have.property('lastName').eql('Boile');
                res.body.data[1].should.have.property('birthDate').eql('1950-02-13');
                res.body.data[1].should.have.property('seniorCenter').eql('Nice little place');
                res.body.data[1].should.have.property('specialDiet').eql(['fish', 'chicken nuggets']);
                res.body.data[1].should.have.property('medicalIssues').eql(['Dementia', 'High Blood Pressure']);
                res.body.data[1].should.have.property('disabilities').eql(['someDisability', 'otherDisability']);
                res.body.data[1].should.have.property('mealPreference').eql('Vegan');

                //Membership Info
                res.body.data[1].should.have.property('membershipDate');
                res.body.data[1].should.have.property('memberIsNewOrRenewal').eql(true);
                res.body.data[1].should.have.property('renewalDate').eql('Today');
                res.body.data[1].should.have.property('formOfPayment').eql(true);
                res.body.data[1].should.have.property('bankCheckNumber').eql('');
                res.body.data[1].should.have.property('includedInEstatePlans').eql(true);
                res.body.data[1].should.have.property('wantsEstateInfo').eql(false);

                //Demographic Info
                res.body.data[1].should.have.property('race').eql('White');
                res.body.data[1].should.have.property('ethnicity').eql('Non-Hispanic/Latino');
                res.body.data[1].should.have.property('numberInHousehold').eql(3);
                res.body.data[1].should.have.property('isPersonCaregiver').eql(true);
                res.body.data[1].should.have.property('monthlyIncome').eql('Over $3,172');
                res.body.data[1].should.have.property('isDisabled').eql(false);
                res.body.data[1].should.have.property('isVeteran').eql(true);
                res.body.data[1].should.have.property('isSpouse60').eql(true);
                res.body.data[1].should.have.property('isDisabled60').eql(false);
                res.body.data[1].should.have.property('caregiver').eql('Jamie Pearson');
                res.body.data[1].should.have.property('grandparent').eql('Grandparent');
                res.body.data[1].should.have.property('needsAADL').eql(['None']);
                res.body.data[1].should.have.property('needsIADL').eql(['None']);
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

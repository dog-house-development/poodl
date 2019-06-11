const mongoUnit = require('mongo-unit');
const chai = require('chai');
chai.use(require('chai-http'));
const mongoose = require('mongoose');

const activities = require('./suites/activities/activities.test.js');
const members = require('./suites/members/members.test.js');
const admins = require('./suites/admins/admins.test.js');
const seniorCenters = require('./suites/seniorCenters/seniorCenters.test.js');
const services = require('./suites/services/services.test.js');

const INITIALDATA = require('./data/initialData');

describe('API tests', function() {
    before(async () => {
        const url = await mongoUnit.start();
        console.log('start mongo unit at ' + url);
        process.env.MONGODB_URI = url;
        await require('../../server.js');
    });

    beforeEach(async function() {
        const Admin = mongoose.model('Admin');
        const admin = new Admin(INITIALDATA.admins[0]);
        await admin.save();
    });

    afterEach(async function() {
        await mongoUnit.drop();
    });

    describe('activities', activities.bind(this));
    describe('members', members.bind(this));
    describe('admins', admins.bind(this));
    describe('seniorCenters', seniorCenters.bind(this));
    describe('services', services.bind(this));
});

const activities = require('./suites/activities/activities.test.js');
const mongoUnit = require('mongo-unit');
const chai = require('chai');
chai.use(require('chai-http'));

describe('API tests', function() {
    before(async () => {
        const url = await mongoUnit.start();
        console.log('start mongo unit at ' + url);
        process.env.MONGODB_URI = url;
        await require('../../server.js');
    });

    after(() => {
        mongoUnit.stop();
    });

    afterEach(async function() {
        await mongoUnit.drop();
    });

    describe('activities', activities.bind(this));
});

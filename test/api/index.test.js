const activities = require('./suites/activities/activities.test.js');
const mongoUnit = require('mongo-unit');

describe('API tests', function() {
    describe('activities', activities.bind(this));
});

//afterEach(() => mongoUnit.drop());

after(() => {
    mongoUnit.stop();
});

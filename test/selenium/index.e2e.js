const mongoUnit = require('mongo-unit');
const login = require('./suites/login/login.e2e.js');
let controller = require('./controller.js');

describe('Selenium tests', function() {
    before(async () => {
        console.log('start mongo unit');
        const url = await mongoUnit.start();
        process.env.MONGODB_URI = url;
        await require('../../server.js');
    });

    after(() => {
        mongoUnit.stop();
    });

    beforeEach(() => {
        controller.initDriver();
    });

    afterEach(async function() {
        await mongoUnit.drop();
        controller.quitDriver();
    });

    describe('login', login.bind(this));
});

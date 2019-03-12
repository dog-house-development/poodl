const prepare = require('mocha-prepare');
const mongoUnit = require('mongo-unit');

prepare(done =>
    mongoUnit.start().then(testMongoUrl => {
        process.env.MONGODB_URI = testMongoUrl;
        console.log('start mongo unit');
        done();
    })
);

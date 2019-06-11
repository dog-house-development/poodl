const DATA = require('./seniorCenters');
const apiTestHelper = require('../../utils/ApiTestHelper');

module.exports = apiTestHelper('seniorCenters', 'SeniorCenter', DATA);

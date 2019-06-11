const DATA = require('./members');
const apiTestHelper = require('../../utils/ApiTestHelper');

module.exports = apiTestHelper('members', 'Member', DATA);

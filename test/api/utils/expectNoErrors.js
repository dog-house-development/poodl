const expect = require('chai').expect;

module.exports = res => expect(res.error, res.body.errmsg || res.body.message || res.error.text).to.not.be.ok;

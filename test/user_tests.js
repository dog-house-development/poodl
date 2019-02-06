process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let user = require("../models/User");

let Mockgoose = require("mockgoose").Mockgoose;
let mockgoose = new Mockgoose(mongoose);

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

before(function(done) {
  mockgoose.prepareStorage().then(function() {
    mongoose.connect(
      "mongodb://example.com/TestingDB",
      function(err) {
        done(err);
      }
    );
  });
});

//reset just in case
mockgoose.helper.reset().then(() => {
  done();
});

describe("/GET users", () => {
  it("it should get all the users", done => {
    chai
      .request(server)
      .get("/api/users/get")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        //res.body.should.have.property("data"); //should go deeper having issues add later
        //res.body.length.should.be.eql(0);
        done();
      });
  });
}).timeout(120000);

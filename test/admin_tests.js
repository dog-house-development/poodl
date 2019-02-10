process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let user = require("../models/Admin");

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

describe("/GET admins", () => {
  it("it should get all the admins", done => {
    chai
      .request(server)
      .get("/api/admins/get")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        //res.body.should.have.property("data"); //should go deeper having issues add later
        //res.body.length.should.be.eql(0);
        done();
      });
  });
}).timeout(120000);

describe("/REGISTER admins", () => {
  it("it should create a new admin", done => {
    let admin = {
      name: "testy boy",
      email: "test@gmail.com",
      password: "greatpassword1!@",
      password2: "greatpassword1!@"
    };

    chai
      .request(server)
      .post("/api/admins/register")
      .send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("name").eql("testy boy");
        res.body.should.have.property("email").eql("test@gmail.com");

        done();
      });
  });
}).timeout(120000);

describe("/LOGIN admins", () => {
  it("it should login an existing admin", done => {
    let loginInfo = {
      email: "test@gmail.com",
      password: "greatpassword1!@"
    };
    chai
      .request(server)
      .post("/api/admins/login")
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("token");

        done();
      });
  }).timeout(120000);
});

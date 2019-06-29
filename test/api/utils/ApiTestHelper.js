const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

const getToken = require('../token/GetToken');
const expectNoErrors = require('./expectNoErrors');

const serverPath = '../../../server';

module.exports = (path, modelName, DATA) =>
    function() {
        const entities = DATA[path.toLowerCase()];
        const addDoc = async () => {
            const Model = mongoose.model(modelName);
            const doc = new Model(entities[0]);
            await doc.save();
        };

        const expectBodyToEqualEntity = res => {
            expectNoErrors(res);
            expect(res).to.have.status(200);
            expect(res.body).to.deep.include(entities[0]);
        };

        describe(`POST /api/${path}/`, function() {
            it(`should add a new ${modelName}`, async () => {
                const res = await chai
                    .request(require(serverPath))
                    .post(`/api/${path}/`)
                    .set('Authorization', getToken())
                    .send(entities[0]);

                expectBodyToEqualEntity(res);
            });
        });

        describe(`POST /api/${path}/filter`, function() {
            beforeEach(async () => {
                const Model = mongoose.model(modelName);
                await Model.insertMany(entities);
            });

            it(`should get all ${path}`, async () => {
                const res = await chai
                    .request(require(serverPath))
                    .post(`/api/${path}/filter`)
                    .set('Authorization', getToken())
                    .send({});

                expectNoErrors(res);
                expect(res).to.have.status(200);
                expect(res.body[0]).to.deep.include(entities[0]);
                expect(res.body[1]).to.deep.include(entities[1]);

                // In ../activities/activities.json there is an
                // activity with a wrong senior center,
                // the filter should not return that one.
                expect(res.body.length).to.equal(2);
            });
        });

        describe(`GET /api/${path}/:id`, function() {
            beforeEach(addDoc);

            it(`it should get a specific ${modelName}`, async () => {
                const res = await chai
                    .request(require(serverPath))
                    .get(`/api/${path}/` + entities[0]._id)
                    .set('Authorization', getToken());

                expectBodyToEqualEntity(res);
            });
        });

        describe(`DELETE /api/${path}/:id`, function() {
            beforeEach(addDoc);

            it(`it should delete a specific ${modelName}`, async () => {
                const res = await chai
                    .request(require(serverPath))
                    .delete(`/api/${path}/` + entities[0]._id)
                    .set('Authorization', getToken());

                expectBodyToEqualEntity(res);
            });
        });
    };

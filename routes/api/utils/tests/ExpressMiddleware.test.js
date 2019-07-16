const chai = require('chai');
const expect = chai.expect;

const {
    addSeniorCenterIdToRequest,
    restrictAccess,
    restrictAdminVolunteer,
    restrictVolunteer
} = require('../ExpressMiddleware');

describe('ExpressMiddleware.js', () => {
    describe('addSeniorCenterIdToRequest', () => {
        it('should add the senior center id to the request', () => {
            const actualReq = {
                user: {
                    seniorCenterId: 'seniorCenterId'
                },
                body: {}
            };

            const res = {};
            let nextCount = 0;
            const next = () => {
                nextCount++;
            };

            addSeniorCenterIdToRequest(actualReq, res, next);

            const expectedReq = {
                body: {
                    ...actualReq.user
                }
            };

            expect(actualReq).to.deep.include(expectedReq);
            expect(nextCount).to.equal(1);
        });
    });

    describe('restrictAccess', () => {
        it('should respond with 401 when access level is invalid', () => {
            let actualStatusCode;
            let actualBody;
            const json = body => {
                actualBody = body;
                return 'json result';
            };

            const status = statusCode => {
                actualStatusCode = statusCode;
                return {
                    json
                };
            };

            const req = {
                user: {
                    accessLevel: 'NotValid'
                }
            };

            const res = {
                status
            };

            let nextCount = 0;
            const next = () => {
                nextCount++;
            };

            const result = restrictAccess()(req, res, next);

            expect(result).to.equal('json result');
            expect(actualStatusCode).to.equal(401);
            const expectedBody = {
                message: "'NotValid' is not a valid access level."
            };

            expect(actualBody).to.deep.equal(expectedBody);
            expect(nextCount).to.equal(0);
        });

        it('should call next when access level is not restricted', () => {
            const req = {
                user: {
                    accessLevel: 'Admin'
                }
            };

            let nextCount = 0;
            const next = () => {
                nextCount++;
            };

            const result = restrictAccess()(req, null, next);

            expect(result).to.be.undefined;
            expect(nextCount).to.equal(1);
        });
    });

    describe('restrictVolunteer', () => {
        it('should restrict a volunteer', () => {
            let actualStatusCode;
            let actualBody;
            const json = body => {
                actualBody = body;
                return 'json result';
            };

            const status = statusCode => {
                actualStatusCode = statusCode;
                return {
                    json
                };
            };

            const req = {
                user: {
                    accessLevel: 'Volunteer'
                },
                method: 'METHOD',
                originalUrl: 'ORIGINALURL'
            };

            const res = {
                status
            };

            let nextCount = 0;
            const next = () => {
                nextCount++;
            };

            const result = restrictVolunteer()(req, res, next);

            expect(result).to.equal('json result');
            expect(actualStatusCode).to.equal(401);
            const expectedBody = {
                message: "Access level 'Volunteer' cannot access method 'METHOD' to 'ORIGINALURL'."
            };

            expect(actualBody).to.deep.equal(expectedBody);
            expect(nextCount).to.equal(0);
        });
    });
});

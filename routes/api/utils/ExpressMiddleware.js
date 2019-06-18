const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');

const restrictAccess = function(restrictedAccessLevels = []) {
    return (req, res, next) => {
        const validAccessLevels = ['Super', 'Admin', 'Volunteer'];
        if (!validAccessLevels.includes(req.user.accessLevel)) {
            return res.status(401).json({ message: `'${req.user.accessLevel}' is not a valid access level.` });
        }
        if (restrictedAccessLevels.includes(req.user.accessLevel)) {
            return res.status(401).json({
                message: `Access level '${req.user.accessLevel}' cannot access method '${req.method}' to '${
                    req.originalUrl
                }'.`
            });
        }
        next();
    };
};

const expressMiddleware = {
    /**
     * Adds the senior center id of the user in the auth token to the body of the request
     * @param {Object}   req  The request
     * @param {Object}   _res The response
     * @param {Function} next The callback
     */
    addSeniorCenterIdToRequest(req, _res, next) {
        req.body.seniorCenterId = req.user.seniorCenterId;
        next();
    },
    restrictAccess: restrictAccess,
    restrictVolunteer: restrictAccess(['Volunteer']),
    restrictAdminVolunteer: restrictAccess(['Volunteer', 'Admin']),

    /**
     * An express middleware that sends a new jwt.
     * @param {request} req API request
     * @param {response} res API response
     */
    sendJwt(req, res) {
        // Create JWT Payload, basically what we want to send in the response
        const { user } = req;
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            seniorCenterId: user.seniorCenterId,
            accessLevel: user.accessLevel
        };

        // Sign token
        return jwt.sign(
            payload,
            keys.jwtKey,
            {
                expiresIn: 39600 // 11 hours in seconds
            },
            (err, token) => {
                if (err) {
                    return res.status(400).json(err);
                }

                return res.json({
                    token: 'Bearer ' + token
                });
            }
        );
    }
};

module.exports = expressMiddleware;

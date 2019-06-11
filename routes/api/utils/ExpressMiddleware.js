module.exports = {
    /**
     * Adds the senior center id of the user in the auth token to the body of the request
     * @param {Object}   req  The request
     * @param {Object}   _res The response
     * @param {Function} next The callback
     */
    addSeniorCenterIdToRequest(req, _res, next) {
        req.body.seniorCenterId = req.user.seniorCenterId;
        next();
    }
};

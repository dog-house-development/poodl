passport = require('passport');
const { addSeniorCenterIdToRequest, restrictAccess } = require('./ExpressMiddleware');

module.exports = {
    /**
     * Api to create new document
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} model  The mongoose model
     */
    create(router, model, restrictedAccessLevels) {
        router.post(
            '/',
            passport.authenticate('jwt', { session: false }),
            restrictAccess(restrictedAccessLevels),
            addSeniorCenterIdToRequest,
            (req, res) => {
                new model(req.body)
                    .save()
                    .then(doc => res.json(doc))
                    .catch(err => {
                        res.status(400).json(err);
                    });
            }
        );
    },

    /**
     * Api to filter all documents in a collection and return results
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} model  The mongoose model
     */
    filter(router, model, middlewares = []) {
        router.post('/filter', passport.authenticate('jwt', { session: false }), middlewares, (req, res) => {
            model.find(req.body, (err, docs) => {
                if (err) {
                    return res.status(400).json(err);
                }

                return res.json(docs);
            });
        });
    },

    /**
     * Api to get single document by id
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} model  The mongoose model
     */
    get(router, model, restrictedAccessLevels) {
        router.get(
            '/:id',
            passport.authenticate('jwt', { session: false }),
            restrictAccess(restrictedAccessLevels),
            (req, res) => {
                model.findById(req.params.id, (err, doc) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    if (!doc) {
                        return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
                    }

                    return res.json(doc);
                });
            }
        );
    },

    /**
     * Api to edit a document by id
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} model  The mongoose model
     */
    edit(router, model, restrictedAccessLevels) {
        router.patch(
            '/:id',
            passport.authenticate('jwt', { session: false }),
            restrictAccess(restrictedAccessLevels),
            (req, res) => {
                model.findById(req.params.id, (err, doc) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    if (!doc) {
                        return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
                    }
                    delete req.body._id;
                    delete req.body.password;
                    delete req.body.accessLevel;
                    delete req.body.seniorCenterId;
                    for (let field in req.body) {
                        doc[field] = req.body[field];
                    }
                    doc.save()
                        .then(doc => res.json(doc))
                        .catch(err => {
                            return res.status(400).json(err);
                        });
                });
            }
        );
    },

    /**
     * Api to delete a document by id
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} model  The mongoose model
     */
    delete(router, model, restrictedAccessLevels) {
        router.delete(
            '/:id',
            passport.authenticate('jwt', { session: false }),
            restrictAccess(restrictedAccessLevels),
            (req, res) => {
                model.findByIdAndDelete(req.params.id, (err, doc) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    if (!doc) {
                        return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
                    }

                    return res.json(doc);
                });
            }
        );
    }
};

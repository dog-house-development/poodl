const passport = require('passport');
const { addSeniorCenterIdToRequest } = require('./ExpressMiddleware');
const mongoose = require('mongoose');

module.exports = {
    /**
     * Api to create new document
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} modelName  The mongoose model
     */
    create(router, modelName, middlewares = []) {
        router.post(
            '/',
            passport.authenticate('jwt', { session: false }),
            middlewares,
            addSeniorCenterIdToRequest,
            (req, res) => {
                new mongoose.model(modelName)(req.body)
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
     * @param {MongooseModel} modelName  The mongoose model
     */
    filter(router, modelName, middlewares = []) {
        router.post('/filter', passport.authenticate('jwt', { session: false }), middlewares, (req, res) => {
            mongoose.model(modelName).find(req.body, (err, docs) => {
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
     * @param {MongooseModel} modelName  The mongoose model
     */
    get(router, modelName, middlewares = []) {
        router.get('/:id', passport.authenticate('jwt', { session: false }), middlewares, (req, res) => {
            mongoose.model(modelName).findById(req.params.id, (err, doc) => {
                if (err) {
                    return res.status(400).json(err);
                }
                if (!doc) {
                    return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
                }

                return res.json(doc);
            });
        });
    },

    /**
     * Api to edit a document by id
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} modelName  The mongoose model
     */
    edit(router, modelName, middlewares = []) {
        router.patch('/:id', passport.authenticate('jwt', { session: false }), middlewares, (req, res) => {
            mongoose.model(modelName).findById(req.params.id, (err, doc) => {
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
        });
    },

    /**
     * Api to delete a document by id
     * @param {ExpressRouter} router The express router
     * @param {MongooseModel} modelName  The mongoose model
     */
    delete(router, modelName, middlewares = []) {
        router.delete('/:id', passport.authenticate('jwt', { session: false }), middlewares, (req, res) => {
            mongoose.model(modelName).findByIdAndDelete(req.params.id, (err, doc) => {
                if (err) {
                    return res.status(400).json(err);
                }
                if (!doc) {
                    return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
                }

                return res.json(doc);
            });
        });
    }
};

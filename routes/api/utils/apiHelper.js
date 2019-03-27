passport = require('passport');
module.exports = {
    // Create api helper
    // @param router    the express Router
    // @param model     the mongoose model for the api
    create: (router, model) => {
        router.post('/', (req, res) => {
            new model(req.body)
                .save()
                .then(doc => res.json(doc))
                .catch(err => {
                    res.status(400).json(err);
                });
        });
    },

    // Filter api helper
    // @param router    the express Router
    // @param model     the mongoose model for the api
    filter: (router, model) => {
        router.post('/filter', passport.authenticate('jwt', { session: false }), (req, res) => {
            model.find(req.body, (err, docs) => {
                if (err) {
                    return res.status(400).json(err);
                }

                return res.json(docs);
            });
        });
    },

    // Get api helper
    // @param router    the express Router
    // @param model     the mongoose model for the api
    get: (router, model) => {
        router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
            model.findById(req.params.id, (err, doc) => {
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

    // Edit api helper
    // @param router    the express Router
    // @param model     the mongoose model for the api
    edit: (router, model) => {
        router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
            model.findById(req.params.id, (err, doc) => {
                if (err) {
                    return res.status(400).json(err);
                }
                if (!doc) {
                    return res.status(404).json({ _id: `Document id '${req.params.id}' does not exist` });
                }
                if (req.body._id) {
                    delete req.body._id;
                }
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

    // Delete api helper
    // @param router    the express Router
    // @param model     the mongoose model for the api
    delete: (router, model) => {
        router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
            model.findByIdAndDelete(req.params.id, (err, doc) => {
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

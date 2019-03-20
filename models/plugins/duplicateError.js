module.exports = function duplicateErrorPlugin(schema, newError) {
    schema.post('save', function(error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(newError);
        } else {
            next(error);
        }
    });
};

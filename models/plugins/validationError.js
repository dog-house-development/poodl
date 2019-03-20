module.exports = function validationErrorPlugin(schema) {
    schema.post('save', function(error, doc, next) {
        let transformError = {};
        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach(function(key) {
                transformError[key] = error.errors[key].message;
            });
            next(transformError);
        } else {
            next(error);
        }
    });
};

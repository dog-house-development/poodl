module.exports = function validationErrorPlugin(schema) {
    schema.post('save', function(error, doc, next) {
        console.log('hello');
        console.log('post save error', error);
        let transformError = {};
        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach(function(key) {
                transformError[key] = error.errors[key].message;
            });
            console.log(transformError);
            next(transformError);
        } else {
            next();
        }
    });
};

module.exports = function(duplicateError) {
    return function(error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(duplicateError);
        } else {
            next(error);
        }
    };
};

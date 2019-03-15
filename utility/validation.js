module.exports = function invalid(doc, res) {
    validateError = doc.validateSync();
    let error = {};
    if (validateError) {
        Object.keys(validateError.errors).forEach(function(key) {
            error[key] = validateError.errors[key].message;
        });
        console.log(error);
        return res.status(400).json(error);
    }
};

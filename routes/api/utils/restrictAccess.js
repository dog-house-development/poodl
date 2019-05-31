const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const jwt = require('jsonwebtoken');

module.exports = async (req, restrictAccess) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const decoded = jwt.decode(req.headers.authorization.split(' ')[1]);
        // console.log(decoded);
        const admin = await Admin.findById(decoded.id);
        console.log('admin' + admin);

        console.log(restrictAccess);
        if (restrictAccess.includes(admin.accessLevel)) {
            return {
                error: 'Access is restricted'
            };
        }
    }
};

// If there is not an environment variable set then there should
// be a secrets file.
module.exports = {
    jwtKey: process.env.JWT_KEY || require('./secrets').jwtKey,
    mongoURI: process.env.MONGODB_URI || require('./secrets').mongoURI
};

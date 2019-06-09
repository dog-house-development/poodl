const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('mongoose').model('Admin');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtKey;

module.exports = passport => {
    // See http://www.passportjs.org/packages/passport-jwt/ for more info
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Admin.findById(jwt_payload.id)
                .then(admin => {
                    if (admin) {
                        return done(null, admin);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('mongoose').model('Admin');
const secrets = require('../config/secrets');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY || secrets.jwtKey;

module.exports = passport => {
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

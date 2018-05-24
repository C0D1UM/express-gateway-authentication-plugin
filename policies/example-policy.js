const passport = require('../../node_modules/passport');
const GoogleStrategy = require('../../node_modules/passport-google-oauth20').Strategy;
const User = require('../models/user-model');
const keys = require('../keys');

const passportJWT = require("../../node_modules/passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const BasicStrategy = require('../../node_modules/passport-http').BasicStrategy;

module.exports = {
    name: 'example',
    policy: (actionParams) => {

        passport.use(new BasicStrategy(
            function (userid, password, cb) {
                User.findOne({username: userid, password: password}).then(currentUser => {
                    if (currentUser) {
                        return cb(null, currentUser);
                    } else {
                        User.create({
                            username: userid,
                            password: password
                        }).then((newUser) => {
                            return cb(null, newUser);
                        });
                    }
                }).catch(err => {
                    return cb(err);
                });
            }
        ));

        passport.use(new GoogleStrategy({
                clientID: keys.google.clientId,
                clientSecret: keys.google.clientSecret,
                callbackURL: keys.google.callbackURL
            },
            function (accessToken, refreshToken, profile, cb) {
                User.findOne({username: profile.name.givenName}).then(currentUser => {
                    if (currentUser) {
                        return cb(null, currentUser);
                    } else {
                        User.create({
                            username: profile.name.givenName,
                            first_name: profile.name.givenName,
                            last_name: profile.name.familyName
                        }).then(newUser => {
                            return cb(null, newUser);
                        });
                    }
                }).catch(err => {
                    return cb(err);
                });

            }
        ));

        passport.use(new JWTStrategy({
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: keys.jwt.secretKey
            },
            function (jwtPayload, cb) {
                return User.findOne({username: jwtPayload.username}).then(user => {
                    if (user) {
                        return cb(null, user);
                    }
                    return cb(null, false);
                }).catch(err => {
                    return cb(err);
                });
            }
        ));

        return (req, res, next) => {
            passport.authenticate('jwt', {session: false}, (err, user) => {
                req.headers['USERINFO'] = JSON.stringify(user);
                next();
            })(req, res, next);

            //res.json({ hello: 'ok', url: req.url, actionParams });
            //next() // calling next policy
        };
    }
};

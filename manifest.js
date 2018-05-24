const passport = require('../node_modules/passport');
const jwt = require('../node_modules/jsonwebtoken');
const keys = require('./keys');

module.exports = {
    version: '1.0.0',
    init: function (pluginContext) {
        pluginContext.registerPolicy(require('./policies/example-policy'));
        pluginContext.registerGatewayRoute(app => {
            app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
            app.get('/auth/google/callback',
                function (req, res, next) {
                    passport.authenticate('google', {session: false}, (err, user) => {
                        if (err || !user) {
                            return res.status(400).json({
                                message: 'Something is not right',
                                user: user
                            });
                        }

                        req.login(user, {session: false}, (err) => {
                            if (err) {
                                res.send("error => " + err);
                            }
                            const jwtToken = jwt.sign(user.toJSON(), keys.jwt.secretKey);

                            //return res.json({user, token});

                            res.cookie('cookieJwtToken', jwtToken);
                            res.redirect(keys.redirect.homeUrl);
                        });
                    })(req, res);
                }
            );
            app.get('/auth/basic',
                function (req, res, next) {
                    passport.authenticate('basic', {session: false}, (err, user) => {
                        if (err || !user) {
                            return res.status(400).json({
                                message: 'Something is not right',
                                user: user
                            });
                        }

                        req.login(user, {session: false}, (err) => {
                            if (err) {
                                res.send("error => " + err);
                            }
                            const jwtToken = jwt.sign(user.toJSON(), keys.jwt.secretKey);

                            return res.json({user, jwtToken});
                        });
                    })(req, res);
                }
            );
        });
        pluginContext.registerAdminRoute(require('./routes/admin-api'));

        pluginContext.eventBus.on('hot-reload', function ({type, newConfig}) {
            console.log('hot-reload', type, newConfig);
        });
        pluginContext.eventBus.on('http-ready', function ({httpServer}) {
            console.log('http ready');
        });
        pluginContext.eventBus.on('https-ready', function ({httpsServer}) {
            console.log('https ready');
        });
        pluginContext.eventBus.on('admin-ready', function ({adminServer}) {
            console.log('admin ready');
        });
    },
    policies: ['example'] // this is for CLI to automatically add to "policies" whitelist in gateway.config
};


module.exports = {
    google: {
        clientId: 'xxx',
        clientSecret: 'xxx',
        callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    db: {
        postgresqlUrl: process.env.DATABASE_URL
    },
    jwt: {
        secretKey: 'xxx'
    },
    redirect: {
        homeUrl: 'http://localhost:4200'
    }
};

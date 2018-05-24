
module.exports = {
    google: {
        clientId: 'xxx',
        clientSecret: 'xxx',
        callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    db: {
        postgresqlUrl: 'postgres://postgres:postgres@localhost:5432/userdatabase'
    },
    jwt: {
        secretKey: 'xxx'
    },
    redirect: {
        homeUrl: 'http://localhost:4200'
    }
};

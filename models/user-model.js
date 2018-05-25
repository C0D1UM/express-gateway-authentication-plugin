const keys = require('../keys');
const Sequelize = require('../../node_modules/sequelize');
const sequelize = new Sequelize(keys.db.postgresqlUrl);
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    phone_number_1: {
        type: Sequelize.STRING
    },
    phone_number_2: {
        type: Sequelize.STRING
    },
    is_sign_up: {
        type: Sequelize.BOOLEAN
    },
    role: {
        type: Sequelize.INTEGER
    },
    job_position: {
        type: Sequelize.INTEGER
    },
});
User.sync({force: false});

module.exports = User;

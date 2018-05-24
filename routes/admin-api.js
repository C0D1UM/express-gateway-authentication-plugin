const User = require('../models/user-model');

module.exports = function (adminExpressApp) {
    adminExpressApp.get('/create-user', function (req, res) {

    });

    adminExpressApp.post('/create-user', function (req, res) {
        User.create({
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number_1: req.body.phone_number_1,
            phone_number_2: req.body.phone_number_2,
            is_sign_up: req.body.is_sign_up,
            role: req.body.role,
            job_position: req.body.job_position,
        }).then(newUser => {
            return res.send("succesfully created : " + newUser);
        });

    });

    adminExpressApp.put('/create-user/:username', function (req, res) {
        User.update({
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number_1: req.body.phone_number_1,
                phone_number_2: req.body.phone_number_2,
                is_sign_up: req.body.is_sign_up,
                role: req.body.role,
                job_position: req.body.job_position,
            },
            { where: {username: req.username} }
        ).then(result => {
            return res.send("succesfully updated" + result);
        });
    });

    adminExpressApp.delete('/create-user/:user_id', function (req, res) {

    });
};
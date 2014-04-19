'use strict';

module.exports = {
    login: function (req, res) {
        var app = require('../app');
        var jwt = require('jsonwebtoken');
        var User = require('../models/User');

        User.findOne({username: req.body.username, password: req.body.password}, function (err, user) {
            if (err) return res.send(500);
            if (!user) return res.send(404);

            var token = jwt.sign(user, app.get('secret'), {expiresInMinutes: 60 * 5});

            res.json({uid: user.id, token: token});
        });
    }
};
'use strict';

module.exports = {
    auth: function (req) {
        var User = require('../models/User');

        User.findOne({authCode: req.data.authCode}, function (err, user) {
            if (err) return next(err);
            if (!user) return next();

            req.user = user.user;
        });
    }
}

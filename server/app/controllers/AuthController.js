'use strict';

module.exports = {
    auth: function (req) {
        var reqs = require('../reqs');
        var User = require('../models/User');

        User.findOne({username: req.data.username, password: req.data.password}, function (err, user) {
            if (err || !user) return req.io.respond({error: 1});

            reqs.set(user.id, req);
            req.user = user.user;
            req.io.respond({error: 0});
        });
    }
}

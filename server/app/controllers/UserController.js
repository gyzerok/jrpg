'use strict';

module.exports = {
    vent: null,

    init: function (vent) {
        this.vent = vent;

    },

    auth: function (req, next) {
        var User = require('../models/User');

        User.findOne({authCode: req.data.authCode}, function (err, user) {
            if (err) return next(err);
            //if (!user) return next();

            req.user = user;
        });
    },

    findGame: function (req) {
        this.vent.emit('new-user', req.user);
        req.io.respond({
            success: true
        });
    },

    cancelFindGame: function (req) {
        req.io.respond({
            success: true
        });
    }
};
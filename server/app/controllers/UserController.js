'use strict';

var util = require('util');
var _ = require('underscore');
var events = require('events');

var UserControllerMethods = {

    auth: function (req, next) {
        var User = require('../models/User');

        User.findOne({authCode: req.data.authCode}, function (err, user) {
            if (err) return next(err);
            //if (!user) return next();

            req.user = user;
        });
    },

    findGame: function (req) {
        this.emit('new-user', req.user);
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

var UserController = function () {
    events.EventEmitter.call(this);

    _.extend(UserController, UserControllerMethods);
};
util.inherits(UserController, events.EventEmitter);

module.exports = UserController;
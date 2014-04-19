'use strict';

var UserController = {
    vent: null,

    init: function (vent) {
        UserController.vent = vent;
    },

    findGame: function (req) {
        if (req.user) {
            req.io.respond({
                username: req.username
            });
            return;
        }
        //UserController.vent.emit('new-user', req.user);
        req.io.respond({
            error: 1
        });
    },

    cancelFindGame: function (req) {
        req.io.respond({
            error: 0
        });
    }
};

module.exports = UserController;
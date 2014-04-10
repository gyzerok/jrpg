'use strict';

module.exports = {
    vent: null,

    init: function (vent) {
        this.vent = vent;
    },

    findGame: function (req) {
        this.vent.emit('new-user', req.user);
        req.io.respond({
            error: 0
        });
    },

    cancelFindGame: function (req) {
        req.io.respond({
            error: 0
        });
    }
};
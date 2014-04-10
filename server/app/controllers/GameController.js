'use strict';

module.exports = {
    vent: null,

    init: function (vent) {
        this.vent = vent;

        this.vent.on('create-new-game', this.create);
    },

    create: function (users) {
        var reqs = require('../reqs');

        console.log('Found pair: ', users[0].username + '&', users[1].username);
        reqs.get(users[0]).io.emit('new-game', {enemy: user[1].username});
        reqs.get(users[1]).io.emit('new-game', {enemy: user[0].username});
    }
};
'use strict';

module.exports = {
    vent: null,

    init: function (vent) {
        this.vent = vent;

        this.vent.on('create-new-game', this.create);
    },

    create: function (participants) {
        console.log('Found pair: ', participants[0].username + '&', participants[1].username);
    }
};
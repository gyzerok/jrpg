'use strict';

var util = require('util');
var _ = require('underscore');
var events = require('events');

var GameControllerMethods = {

    create: function (participants) {
        console.log('Found pair: ', participants[0].username + '&', participants[1].username);
    }
};

var GameController = function () {
    events.EventEmitter.call(this);

    _.extend(this, GameControllerMethods);

    this.on('create-new-game', this.create);
};
util.inherits(GameController, events.EventEmitter);

module.exports = GameController;
'use strict';

var util = require('util');
var _ = require('underscore');
var events = require('events');

var MatcherMethods = {
    tryInterval: null,
    queue: [],

    onNewUser: function (user) {
        this.queue.push({user: user, range: this.baseSearchRange});
        this.tryMatch()
    },

    start: function () {
        var self = this;
        this.tryInterval = setInterval(self.tryMatch, self.matchTryInterval);
    },

    stop: function () {
        if (this.tryInterval) clearInterval(this.tryInterval);
    },

    tryMatch: function () {
        if (this.queue.length < 2) return;

        this.queue.sort(comparer);

        for (var i = 0; i < this.queue.length - 1; i++) {
            var checkingObj = this.queue[i];
            for (var j = i; j < this.queue.length; j++) {
                var possiblePairObj = this.queue[j];

                // Нашлась ли пара?
                var acceptablePair = (checkingObj.user.rating + checkingObj.range) >= possiblePairObj.user.rating &&
                    (possiblePairObj.user.rating + possiblePairObj.range) <= checkingObj.user.rating;

                if (acceptablePair) {
                    this.emit('create-new-game', [checkingObj.user, possiblePairObj.user]);
                }

                this.queue.splice(i, 1);
                this.queue.splice(j, 1);
            }
            // Не нашли пару. Увеличиваем границу
            if (this.queue.indexOf(checkingObj) != -1) {
                this.queue[i].range += this.incrementSearchRange;
            }
        }
    }
};

var Matcher = function (app) {
    events.EventEmitter.call(this);

    this.baseSearchRange = app.get('baseSearchRange');
    this.incrementSearchRange = app.get('incrementSearchRange');
    this.matchTryInterval = app.get('matchTryInterval');
    _.extend(this, MatcherMethods);

    this.on('new-user', this.onNewUser);
};
util.inherits(Matcher, events.EventEmitter);

function comparer(a, b) {
    return a.range - b.range;
}

module.exports = Matcher;
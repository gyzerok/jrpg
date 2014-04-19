'use strict';

function comparer(a, b) {
    return a.range - b.range;
}

var matcher = {
    vent: null,
    baseSearchRange: null,
    incrementSearchRange: null,
    matchTryInterval: null,

    tryInterval: null,
    queue: [],

    init: function (app, vent) {
        matcher.baseSearchRange = app.get('baseSearchRange');
        matcher.incrementSearchRange = app.get('incrementSearchRange');
        matcher.matchTryInterval = app.get('matchTryInterval');
        matcher.vent = vent;

        matcher.vent.on('new-user', matcher.onNewUser);
    },

    onNewUser: function (user) {
        matcher.queue.push({user: user, range: matcher.baseSearchRange});
        matcher.tryMatch()
    },

    start: function () {
        matcher.tryInterval = setInterval(matcher.tryMatch, matcher.matchTryInterval);
    },

    stop: function () {
        if (matcher.tryInterval) clearInterval(matcher.tryInterval);
    },

    tryMatch: function () {
        if (matcher.queue.length < 2) return;

        matcher.queue.sort(comparer);

        for (var i = 0; i < matcher.queue.length - 1; i++) {
            var checkingObj = matcher.queue[i];
            for (var j = i; j < matcher.queue.length; j++) {
                var possiblePairObj = matcher.queue[j];

                // Нашлась ли пара?
                var acceptablePair = (checkingObj.user.rating + checkingObj.range) >= possiblePairObj.user.rating &&
                    (possiblePairObj.user.rating + possiblePairObj.range) <= checkingObj.user.rating;

                if (acceptablePair) {
                    matcher.vent.emit('create-new-game', [checkingObj.user, possiblePairObj.user]);
                }

                matcher.queue.splice(i, 1);
                matcher.queue.splice(j, 1);
            }
            // Не нашли пару. Увеличиваем границу
            if (matcher.queue.indexOf(checkingObj) != -1) {
                matcher.queue[i].range += matcher.incrementSearchRange;
            }
        }
    }
};

module.exports = matcher;
'use strict';

var UserController = require('./controllers/UserController');
var GameController = require('./controllers/GameController');

module.exports = function (app) {

    app.io.route('auth', UserController.auth);
    app.io.route('find-game', UserController.findGame);
    app.io.route('cancel-find-game', UserController.cancelFindGame);

    // TODO: Удалить этот роут
    app.io.route('test', function (req) {
        console.log('New client connected');
    });
};
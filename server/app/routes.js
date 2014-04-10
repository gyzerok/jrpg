'use strict';

var AuthController = require('./controllers/AuthController');
var UserController = require('./controllers/UserController');
var GameController = require('./controllers/GameController');

module.exports = function (app) {

    app.io.route('auth', AuthController.auth);
    app.io.route('find-game', UserController.findGame);
    app.io.route('cancel-find-game', UserController.cancelFindGame);
};
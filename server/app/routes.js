'use strict';

var UserController = require('./controllers/UserController');
var GameController = require('./controllers/GameController');

module.exports = function (app) {

    var userController = new UserController();
    var gameController = new GameController();

    app.io.route('find-game', userController.findGame);
    app.io.route('cancel-find-game', userController.cancelFindGame);
}
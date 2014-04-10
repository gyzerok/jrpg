'use strict';

module.exports = function init(app) {
    var vent = require('./vent');

    var UserController = require('./controllers/UserController');
    UserController.init(vent);

    var GameController = require('./controllers/GameController');
    GameController.init(vent);

    var matcher = require('./logic/matcher');
    matcher.init(app, vent);
    matcher.start();

    var mongoose = require('mongoose');
    var dbPath = app.get('dbPath');
    mongoose.connect(dbPath);
};
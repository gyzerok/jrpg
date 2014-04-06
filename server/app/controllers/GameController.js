/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:03 PM
 */

var Player = require('../models/Player');
var Game = require('../models/Game');
var gameRegistry = require('../models/GameRegistry');
var playersQueue = require('../models/PlayersQueue');

module.exports = {

    find: function (req) {

        var player = new Player(req, req.data.nick);
        playersQueue.push(player, function (player1, player2) {

            var game = new Game(player1, player2);

        });
    },

    hit: function (req) {

    },

    def: function (req) {

    }
}
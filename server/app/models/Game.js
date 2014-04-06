/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:18 PM
 */

var Player = require('./Player');

module.exports = function (player1, player2) {
    this.id = Math.floor((Math.random() * 100) + 1);
    player1.position = Player.POSITION_ATTACK;
    player2.position = Player.POSITION_DEFEND;
    this.players = [player1, player2];

    this.start = function () {
        for (var i = 0; i < 2; i++) {
            this.players[i].req.io.emit('new game', this.state);
        }
    }

    this.state = {
        id: this.id,
        players: [
            {
                nick: this.players[0].nick,
                hp: this.players[0].hp,
                position: this.players[0].position
            },
            {
                nick: this.players[1].nick,
                hp: this.players[1].hp,
                position: this.players[1].position
            }
        ]
    }

    this.swapPlayers = function () {
        var tmp = this.players[0].position;
        this.players[0].position = this.players[1].position;
        this.players[1].position = tmp;
    }

    this.isOver = !(this.players[0].isAlive && this.players[1].isAlive)
}
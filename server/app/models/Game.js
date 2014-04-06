/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:18 PM
 */

var Player = require('./Player');
var Action = require('./Action');

module.exports = function (player1, player2) {
    this.steps = 0;

    this.id = Math.floor((Math.random() * 100) + 1);
    player1.position = Player.POSITION_ATTACK;
    player2.position = Player.POSITION_DEFEND;
    this.players = [player1, player2];

    this.start = function () {
        this.broadcast('new game');
    }

    this.nextRound = function () {
        this.steps = 0;

        if (this.isOver) {
            this.broadcast('end game');
            return;
        }

        this.resolve();
        this.swapPlayers();
        this.broadcast('next round');
    }

    this.resolve = function () {
        var attackingPlayer;
        var defendingPlayer;
        for (var i = 0; i < 2; i++) {
            if (this.players[i].action.type == Action.ACTION_HIT) {
                attackingPlayer = this.players[i];
            }
            else defendingPlayer = this.players[i];
        }

        if (defendingPlayer.action.parts.indexOf(attackingPlayer.action.parts[0]) != -1) {
            defendingPlayer.hp -= attackingPlayer.dmg;
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

    this.isOver = !(this.players[0].isAlive && this.players[1].isAlive);

    this.broadcast = function (event) {
        for (var i = 0; i < 2; i++) {
            this.players[i].req.io.emit(event, this.state);
        }
    }

    this.incSteps = function () {
        this.steps++;

        if (this.steps == 2) {
            this.nextRound();
        }
    }
}
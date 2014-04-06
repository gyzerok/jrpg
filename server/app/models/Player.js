/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:19 PM
 */

module.exports = function Player(req, nick) {

    this.POSITION_UNKNOWN = 0;
    this.POSITION_ATTACK = 1;
    this.POSITION_DEFEND = 2;

    this.PART_HEAD = 1;
    this.PART_CHEST = 2;
    this.PART_STOMACH = 3;
    this.PART_LEGS = 4;

    this.req = req;
    req.player = this;
    this.nick = nick;
    this.hp = 100;
    this.dmg = 10;
    this.action = null;
    this.position = this.POSITION_UNKNOWN;

    this.hit = function (dmg) {
        this.hp -= dmg;
    }

    this.isAlive = (this.hp <= 0);
}
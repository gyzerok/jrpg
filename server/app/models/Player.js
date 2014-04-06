/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:19 PM
 */

module.exports = function (req, nick) {

    this.req = req;
    this.nick = nick;
    this.hp = 100;
    this.dmg = 10;

    this.hit = function (dmg) {
        this.hp -= dmg;
    }

    this.alive = this.hp <= 0;
}
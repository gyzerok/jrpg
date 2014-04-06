/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 6:00 PM
 */

module.exports = function Action(type, parts) {

    this.ACTION_HIT = 1;
    this.ACTION_DEF = 2;

    this.type = type;
    this.parts = parts;
}
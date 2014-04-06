/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:05 PM
 */

var gameController = require('./controllers/GameController');

module.exports = function (app) {

    app.io.route('find', gameController.find);
    app.io.route('act', gameController.act);
}
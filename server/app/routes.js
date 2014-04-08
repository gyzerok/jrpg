/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:05 PM
 */

var userController = require('./controllers/UserController');

module.exports = function (app) {

    app.io.route('find-game', userController.findGame);
    app.io.route('cancel-find-game', userController.cancelFindGame);
}
/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 12:41 PM
 */

module.exports = function (app) {

    app.set('port', 8080);
    app.set('dbPath', 'mongodb://localhost/jrpg-db');
    app.set('baseSearchRange', 100);
    app.set('incrementSearchRange', 10);
    app.set('matchTryInterval', 5000);
    /*app.configure('development', function () {

    });*/
}
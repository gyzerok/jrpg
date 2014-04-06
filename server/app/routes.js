/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:05 PM
 */

module.exports = function (app) {

    app.io.route('/', function (req) {
        console.log(req.body);
    });

    app.io.route('test', function (req) {
        req.io.emit('hello', {
            message: 'Hello, client!'
        });
    });
}
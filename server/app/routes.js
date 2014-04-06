/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:05 PM
 */

module.exports = function (app) {

    /*app.get('/', function (req, res) {
        console.log(req.body);
        res.send('It works!');
    });*/

    app.io.route('*', function (req) {
        console.log('here');
        req.io.emit('hello', {
            message: 'Hello, client!'
        });
    });

    app.io.route('test', function (req) {
        console.log('test');
        req.io.emit('hello', {
            message: 'Test client!'
        });
    });
}
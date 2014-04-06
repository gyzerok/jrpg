/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 12:31 PM
 */

var express = require('express.io');
var app = express();
app.http().io();

require('./config/config')(app);

app.get('/', function (req, res) {
    res.send('It works!');
});

app.io.route('test', function (req) {
    req.io.emit('hello', {
        message: 'Hello, client!'
    });
});

module.exports = app;
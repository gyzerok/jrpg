/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 12:31 PM
 */

var express = require('express.io');
var app = express();
app.http().io();

// Setting up configuration
require('./config/config')(app);

// Setting up routes
require('./routes')(app);

module.exports = app;
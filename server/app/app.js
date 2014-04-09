/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 12:31 PM
 */

var express = require('express.io');
var app = express();
app.io();

// Setting up configuration
require('./config/config')(app);

// Setting up routes
require('./routes')(app);

// Setting up matcher
var Matcher = require('./logic/Matcher');
new Matcher(app);

var mongoose = require('mongoose');
var dbPath = app.get('dbPath');
mongoose.connect(dbPath);

module.exports = app;
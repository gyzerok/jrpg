'use strict';

var express = require('express.io');
var app = express();
app.http().io();

// Setting up configuration
require('./config/config')(app);

// Some initialization
require('./init')(app);

// Setting up routes
require('./routes')(app);

module.exports = app;
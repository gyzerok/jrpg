'use strict';

var app = require('./app/app');

var port = app.get('port');
app.listen(port);
console.log('Server started on 127.0.0.1:' + port);
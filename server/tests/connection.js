var app = require('../app/app');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:' + app.get('port');
var options = {'force new connection': true};

describe("Server", function () {
    before(function (done) {
        var port = app.get('port');
        app.listen(port, done);
    });

    it('should accept incoming connection', function (done) {
        var client1 = io.connect(socketURL, options);

        client1.on('connect', done);
    });
});

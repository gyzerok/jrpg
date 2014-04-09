//var should = require('should');
var app = require('../app/app');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:8080';

var options = {
    transports: ['websocket'],
    'force new connection': true
};

describe("Server", function () {
    before(function (done) {
        var port = app.get('port');
        app.listen(port);
        done();
    });

    it('should accept incoming connections', function (done) {
        var client1 = io.connect(socketURL, options);

        client1.on('connect', function (data) {
            client1.emit('test');
            done();
            /*client1.on('test', function () {
                console.log('Dummy client connected.');
                done();
            });*/
        });
    });
});

var app = require('../app/app');
var async = require('async');
var io = require('socket.io-client');
var expect = require('chai').expect;

var socketURL = 'http://0.0.0.0:' + app.get('port');
var options = {'force new connection': true};

var user1 = {username: 'user1', password: '123'};
var user2 = {username: 'user2', password: '456'};

var client1, client2;

describe("Server", function () {
    before(function (done) {
        var port = app.get('port');
        app.listen(port, function () {
            var User = require('../app/models/User');
            async.series([
                function (callback) {
                    User.collection.remove(callback);
                },
                function (callback) {
                    User.create(user1, callback);
                },
                function (callback) {
                    User.create(user2, callback);
                }
            ],
            function (err, results) {
                expect(err).to.be.undefined;
                done();
            });
        });
    });

    it('should login 2 clients', function (done) {
        client1 = io.connect(socketURL, options);
        client1.on('connect', function () {
            client1.emit('auth', user1, function (data) {
                expect(data.error).to.be.equal(0);
                onComplete();
            });
        });

        client2 = io.connect(socketURL, options);
        client2.on('connect', function () {
            client2.emit('auth', user2, function (data) {
                expect(data.error).to.be.equal(0);
                onComplete();
            });
        });

        var calls = 0;
        function onComplete() {
            calls += 1;

            if (calls == 2) done();
        }
    });

    it('should create a new game', function (done) {
        client1.emit('find-game', user1, function (data) {
            expect(data.error).to.be.equal(0);
            onComplete();
        });
        client2.emit('find-game', user2, function (data) {
            expect(data.error).to.be.equal(0);
            onComplete();
        });

        /*client1.on('new-game', function (data) {
            expect(data.enemy).to.be.equal(user2.username);
            onComplete();
        });
        client2.on('new-game', function (data) {
            expect(data.enemy).to.be.equal(user1.username);
            onComplete();
        });*/

        var calls = 0;
        function onComplete() {
            calls += 1;

            if (calls == 2) done();
        }
    });
});


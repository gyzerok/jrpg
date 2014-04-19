'use strict';

module.exports = function (app) {

    app.set('port', 7777);
    app.set('dbPath', 'mongodb://localhost/jrpg-db');
    app.set('baseSearchRange', 100);
    app.set('incrementSearchRange', 10);
    app.set('matchTryInterval', 5000);

    app.configure('test', function () {
        app.set('dbPath', 'mongodb://localhost/jrpg-db-test');
    });
};
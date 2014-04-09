'use strict';

var ServerError = require('./ServerError');

module.exports = {
    SUCCESS: new ServerError({
        errno: 0,
        message: 'Request succeded'
    }),
    USER_NOT_FOUND: new ServerError({
        errno: 1,
        message: 'User not found'
    })
};

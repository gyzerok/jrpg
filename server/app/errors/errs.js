'use strict';

var ServerError = require('./ServerError');

module.exports = {
    SUCCESS: new ServerError({
        code: 0,
        message: 'Request succeded'
    }),
    USER_NOT_FOUND: new ServerError({
        code: 1,
        message: 'User not found'
    })
};

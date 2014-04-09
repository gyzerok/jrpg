'use strict';

module.exports = function ServerError(args) {
    this.errno = args.errno;
    this.message = args.message;
};
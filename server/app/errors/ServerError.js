'use strict';

module.exports = function ServerError(args) {
    this.code = args.code;
    this.message = args.message;
};
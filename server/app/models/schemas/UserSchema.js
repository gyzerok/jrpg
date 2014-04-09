/**
 * @author: gyzerok@gmail.com
 * Date: 4/9/14
 * Time: 8:30 PM
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    username: {
        type: String,
        unique: true,
        trim: true
    },
    authCode: {
        type: String,
        unique: true,
        require: true
    },
    rating: {
        type: Number,
        required: true,
        default: 400
    },
    regDate: {
        type: Date,
        required: true
    }
});

module.exports = userSchema;
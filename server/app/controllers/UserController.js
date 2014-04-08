/**
 * @author: gyzerok@gmail.com
 * Date: 4/8/14
 * Time: 8:16 PM
 */

module.exports = {
    findGame: function (req) {
        req.io.respond({
            success: true
        });
    },

    cancelFindGame: function (req) {
        req.io.respond({
            success: true
        });
    }
};
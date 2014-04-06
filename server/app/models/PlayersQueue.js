/**
 * @author: gyzerok@gmail.com
 * Date: 4/6/14
 * Time: 1:16 PM
 */

module.exports = {

    queue: [],

    push: function (player, callback) {
        this.queue.push(player);

        if (this.queue.length > 1) {
            var player1 = this.queue.pop();
            var player2 = this.queue.pop();
            return callback(player1, player2);
        }
    }
}
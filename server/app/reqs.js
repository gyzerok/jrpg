module.exports = {
    reqs: [],

    set: function (id, req) {
        this.reqs[id] = req;
    },
    get: function (id) {
        return this.reqs[id];
    }
};
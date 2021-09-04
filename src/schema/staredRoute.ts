
var mongoose = require('mongoose');

/**
 * createTime: yyyy-MM-dd hh:mm:ss
 */
module.exports = new mongoose.Schema({
    account: String,
    route: {
        start: Array,
        stop: Array,
        waypoints: Array,
        detailed: Array,
        createTime: String
    }
})
// .virtual('id').get(function () {
//     //@ts-ignore
//     return this._id;
// })
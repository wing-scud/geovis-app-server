const mongoose = require('mongoose');
/**
 * route:{
 * lnlat:
 * name
 * describe
 * }
 */
module.exports = new mongoose.Schema({
    id: String,
    account: String,
    route: Object,
    createTime: String
})
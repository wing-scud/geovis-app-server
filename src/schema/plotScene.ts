const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    id: String,
    account: String,
    name:String,
    jsonPath: String,
    createTime: String
})
const mongoose = require('mongoose');
const historyRoute = require('../schema/historyRoute.ts')

module.exports = new mongoose.model('HistoryRoute',historyRoute)
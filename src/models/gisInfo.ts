const mongoose = require('mongoose');
const gisInfo = require('../schema/gisInfo.ts')

module.exports = new mongoose.model('GisInfo',gisInfo)
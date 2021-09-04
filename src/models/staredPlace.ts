const mongoose = require('mongoose');
const staredPlace = require('../schema/staredPlace.ts')

module.exports = new mongoose.model('StaredPlace',staredPlace)
const mongoose = require('mongoose');
const staredRoute = require('../schema/staredRoute.ts')

module.exports = new mongoose.model('StaredRoute',staredRoute)
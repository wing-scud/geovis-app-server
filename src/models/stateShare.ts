const mongoose = require('mongoose');
const stateShare = require('../schema/stateShare.ts')

module.exports = new mongoose.model('StateShare', stateShare)
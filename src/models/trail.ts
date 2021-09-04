const mongoose = require('mongoose');
const trail = require('../schema/trail.ts')

module.exports = new mongoose.model('Trail', trail)
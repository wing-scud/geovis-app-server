const mongoose = require('mongoose');
const plotScene = require('../schema/plotScene.ts')

module.exports = new mongoose.model('PlotScene',plotScene)
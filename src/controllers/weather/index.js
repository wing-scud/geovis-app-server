const express = require('express')
const fs =require('fs-extra')
const weatherRouter = express.Router();
const configPhenomena = JSON.parse(fs.readFileSync('public/static/weather/weather-config.json'))
global.CONFIG['phenomenaConfig'] = configPhenomena;
weatherRouter.use('/dayBrief', require('./controller/dayBrief.js'))
weatherRouter.use('/dayDetail', require('./controller/dayDetail.js'))
weatherRouter.use('/fifteenDayWeather', require('./controller/fifteenDayWeather.js'))
weatherRouter.use('/mapboxVector', require('./controller/mapboxVector.js'))
weatherRouter.use('/mapboxScalar', require('./controller/mapboxScalar.js'))
weatherRouter.use('/pngOut', require('./controller/pngOut.js'))
weatherRouter.use('/tiffOut', require('./controller/tiffOut.js'))
module.exports = weatherRouter;
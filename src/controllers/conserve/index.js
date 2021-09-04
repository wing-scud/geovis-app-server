const express = require('express')
const fs = require('fs-extra')
const conserveRouter = express.Router();
const { checkToken } = require("../../util/token.js");
const fileHandle = require('../../util/fileHandle.js');
const configConserve = JSON.parse(fs.readFileSync('public/static/conserve/conserve-config.json'))
global.CONFIG['configConserve'] = configConserve;
async function validateToken(req, res, next) {
    const result = await checkToken(req);
    if (typeof result === "string") {
        res.json({
            success: false,
            message: result
        })
    } else {
        req.body.user = result;
        next()
    }
}
conserveRouter.use('/editGisInfo', fileHandle().array("fileList", 8), validateToken, require('./controller/editGisInfo.js'));
// 中间件有加载顺序之分，
conserveRouter.use('/editPlotScene', fileHandle().single('plotFile'), validateToken, require('./controller/editPlotScene.js'));
conserveRouter.use('/editTrail', fileHandle().single('geojsonFile'), validateToken, require('./controller/editTrail.js'));
conserveRouter.use(validateToken)
conserveRouter.use('/editStaredPlace', require('./controller/editStaredPlace.js'));
conserveRouter.use('/editStaredRoute', require('./controller/editStaredRoute.js'));
conserveRouter.use('/editHistoryRoute', require('./controller/editHistoryRoute.js'));
module.exports = conserveRouter;
const fs = require('fs-extra');
const path = require('path')
const generateJsonAndPngVector = require('../tool/generateJsonAndPngVector');
/**
 * 获取json and png
 * 主要参数为变量、时间、type=json/png
 * name=? time=? type=?// application/json
 * @param {*} res 
 * @param {*} rep 
 */
 const configPhenomena = global.CONFIG['phenomenaConfig'];
 const fileConfig = configPhenomena.fileMap
 const { cacheMapox } = configPhenomena.pathMap
module.exports = async function handle(req, res) {
    const { time, name, type } = req.body;
    const variableConfig = fileConfig[name];
    const uName = variableConfig.variable[0];
    const vName = variableConfig.variable[1];
    const fileName = variableConfig.fileName
    // 缓存寻找png/json
    const typeName = `${fileName}_name-${name}_time-${time}.${type}`;
    // 缓存内无
    console.log(typeName)
    if (!fs.existsSync(path.join(cacheMapox, typeName))) {
        await generateJsonAndPngVector(fileName, {
            name, uName, vName, time
        })
    }
    res.sendFile(path.join(cacheMapox, typeName),{root:global.CONFIG.root})
}
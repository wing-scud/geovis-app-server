const fs = require('fs-extra');
const path = require('path')
const PNG = require('pngjs').PNG
const ncToJson = require('./ncToJson')
const configPhenomena = global.CONFIG['phenomenaConfig'];
const { baseMapoxPath, cacheMapox } = configPhenomena.pathMap
function generateJsonAndPngScalar(file, options) {
    return new Promise(async (resolve) => {
        const { variable, time, name } = options;
        const variablePath = path.join(baseMapoxPath, file, variable, 'time', `variable-${variable}_time-${time}.json`);
        if (!fs.existsSync(variablePath)) {
            //基础路径无
            await ncToJson(file)
        }
        const fileName = file + `_name-${name}_time-${time}`
        const variableJson = JSON.parse(fs.readFileSync(variablePath));
        await writeJsonAndPng(variableJson, fileName, variable) && resolve(true)
    })
}
function writeJsonAndPng(variableJson, fileName, variable) {
    return new Promise((resolve) => {
        const data = variableJson.data;
        const header = variableJson.header;
        const { max, min, nx: width, ny: height } = header
        Object.assign(header, {
            "GRIB_COMMENT": "标量",
            "GRIB_DISCIPLINE": "0(Meteorological)",
            "GRIB_ELEMENT": variable,
        })
        const jsonName = path.join(cacheMapox, fileName + '.json');
        fs.writeFileSync(jsonName, JSON.stringify({
            header: header,
            data: data
        }
            , null, 2) + '\n');
        const png = new PNG({
            colorType: 2,
            filterType: 4,
            width: width,
            height: height
        });
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                const k = y * width + (x + width / 2) % width;
                png.data[i + 0] = Math.floor(255 * (data[k] - min) / (max - min));
                png.data[i + 1] = 0;
                png.data[i + 2] = 0;
                png.data[i + 3] = 255;
            }
        }
        const pngName = path.join(cacheMapox, fileName + '.png')
        const writeStream = fs.createWriteStream(pngName)
        png.pack().pipe(writeStream);
        writeStream.on('finish', () => {
            resolve(true)
        })
    })
}
module.exports = generateJsonAndPngScalar;

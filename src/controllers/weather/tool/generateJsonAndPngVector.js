const fs = require('fs-extra');
const path = require('path')
const PNG = require('pngjs').PNG
const ncToJson = require('./ncToJson')
const configPhenomena = global.CONFIG['phenomenaConfig'];
const { baseMapoxPath, cacheMapox } = configPhenomena.pathMap
function generateJsonAndPngVector(file, options) {
    return new Promise(async (resolve) => {
        const { uName, vName, time, name } = options;
        const uPath = path.join(baseMapoxPath, file, uName, 'time', `variable-${uName}_time-${time}.json`);
        const vPath = path.join(baseMapoxPath, file, vName, 'time', `variable-${vName}_time-${time}.json`);
        if (!fs.existsSync(uPath) || !fs.existsSync(vPath)) {
            //基础路径无
            await ncToJson(file)
        }
        const fileName = file + `_name-${name}_time-${time}`
        const uJson = JSON.parse(fs.readFileSync(uPath));
        const vJson = JSON.parse(fs.readFileSync(vPath));
        await writeJsonAndPng(uJson, vJson, fileName) && resolve(true)
    })
}
function writeJsonAndPng(uJson, vJson, fileName) {
    return new Promise((resolve) => {
        const udata = uJson.data;
        const vdata = vJson.data;
        const uheader = uJson.header;
        const vheader = vJson.header;
        const { max: umax, min: umin, nx: width, ny: height } = uheader
        const { max: vmax, min: vmin } = vheader
        Object.assign(uheader, {
            "GRIB_COMMENT": "u-component of wind [m/s]",
            "GRIB_DISCIPLINE": "0(Meteorological)",
            "GRIB_ELEMENT": "UGRD",
        })
        Object.assign(vheader, {
            "GRIB_COMMENT": "v-component of wind [m/s]",
            "GRIB_DISCIPLINE": "0(Meteorological)",
            "GRIB_ELEMENT": "VGRD",
        })
        const jsonName = path.join(cacheMapox, fileName + '.json');
        fs.writeFileSync(jsonName, JSON.stringify([{
            header: uheader,
            data: udata
        }, {
            header: vheader,
            data: vdata
        }]
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
                png.data[i + 0] = Math.floor(255 * (udata[k] - umin) / (umax - umin));
                png.data[i + 1] = Math.floor(255 * (vdata[k] - vmin) / (vmax - vmin));
                png.data[i + 2] = 0;
                png.data[i + 3] = 255;
            }
        }
        const pngName = path.join(cacheMapox, fileName + '.png');
        const writeStream = fs.createWriteStream(pngName)
        png.pack().pipe(writeStream);
        writeStream.on('finish', () => {
            resolve(true)
        })
    })
}
module.exports = generateJsonAndPngVector;
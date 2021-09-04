const PNG = require('pngjs').PNG;
var fs = require("fs-extra");
var path = require("path");
var GeoTIFF = require('geotiff');
const { tiffBasePath, colorBasePath, cachePng: cachePath } = global.CONFIG['phenomenaConfig'].pathMap

const ncToGeoTiff = require('../tool/ncToGeotiff')
// name=？、color=？、time=？、variable=？
const queryParams = ['time'];
module.exports = async function handle(request, response) {
    const { name, color: colorImageName, variable: variableName } = request.body;
    let paramsObj = {}
    queryParams.map((key) => {
        paramsObj[key] = request.body[key]
    });
    const keys = Object.keys(paramsObj)
    const values = Object.values(paramsObj);
    let colorParamsName = "color-" + colorImageName;
    let paramsName = "variable-" + variableName + "_" + keys.map((item, index) => {
        return item + "-" + values[index]
    }).join("_")
    // 缓存寻找png
    const pngName = `${name}_${colorParamsName}_${paramsName}.png`
    const cachePngPath = path.join(cachePath, pngName);
    try {
        if (fs.pathExistsSync(cachePngPath)) {
            console.log(cachePngPath)
            responseFile(cachePngPath, response);
        } else {
            // 缓存无png ，png转化
            const paramsPath = keys.join('/');
            //找到tif
            const tiffOriginPath = path.join(tiffBasePath, name, variableName, paramsPath, `${paramsName}.tif`);
            if (!fs.pathExistsSync(tiffOriginPath)) {
                await ncToGeoTiff(name);
            }
            await resolveTiff(tiffOriginPath, pngName, colorImageName, cachePngPath)
            responseFile(cachePngPath, response);
        }
    } catch (e) {
        console.log(e)
    }
}
async function parseTiffToCanvas(tiff, colorImageName) {
    const img = await tiff.getImage();
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();
    const tileWidth = image.getTileWidth();
    const tileHeight = image.getTileHeight();
    const rasters = await image.readRasters();
    const tiffData = await image.readRasters();
    const getFileDirectory = image.getFileDirectory();
    const tempData = new Array(image.getHeight());
    const bbox = image.getBoundingBox();
    const metaData = image.getGDALMetadata();
    const keys = image.getGeoKeys();
    const noData = image.getGDALNoData();
    const missingValue = Number(noData);
    for (let j = 0; j < height; j++) {
        tempData[j] = new Array(width);
        for (let i = 0; i < width; i++) {
            tempData[j][i] = rasters[0][i + j * width];
        }
    }
    const [min, max] = getMaxMin(tiffData[0], missingValue);
    const scaleWidth = 256;
    //Uint8ClampedArray
    const colorUCA = await chooseColor(colorImageName);
    //png
    const png = new PNG({
        width: width, height: height
    })
    const tiffUCA = png.data;
    let pos = 0;
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            //点坐标
            const px = i;
            const py = j;
            if (Math.floor(px) >= 0 && Math.ceil(px) < image.getWidth() && Math.floor(py) >= 0 && Math.ceil(py) < image.getHeight()) {
                const value = tempData[py][px];
                const c = Math.round((scaleWidth - 1) * ((value - min) / (max - min)));
                let alpha = 180;
                if (value > max || value < min || isNaN(value) || value === missingValue) {
                    alpha = 0;
                }
                if (c < 0 || c > scaleWidth - 1) {
                    alpha = 0;
                }
                // 设置-80 到 -90 透明
                let temp = j / height * 180
                if (170 <= temp && temp <= 180) {
                    alpha = 0;
                }
                tiffUCA[pos] = colorUCA[c * 4];
                tiffUCA[pos + 1] = colorUCA[c * 4 + 1];
                tiffUCA[pos + 2] = colorUCA[c * 4 + 2];
                tiffUCA[pos + 3] = alpha;
                pos = pos + 4;
            }
        }
    }
    const bounds = [bbox[0], bbox[1], bbox[2], bbox[3]];
    return { png, bounds }
}
/**
 * 
 * @param {*} name 颜色图片名称
 * 由于颜色图片存在四周黑色边框部分
 *      所以取颜色条，从中间部分取 
 */
async function chooseColor(name) {
    const colorPath = path.join(colorBasePath, name + ".png");
    const data = fs.readFileSync(colorPath);
    const png = PNG.sync.read(data);
    const width = png.width;
    const height = png.height;
    const half = Math.floor(height / 2);
    const colorUCA = png.data.slice(4 * (half * width + 1), 4 * (half * width + 256));
    return colorUCA
}
async function getTiff(filePath) {
    const buffer = fs.readFileSync(filePath);
    const tiff = await GeoTIFF.fromArrayBuffer(buffer.buffer);
    return tiff;
}
function getMaxMin(array, missingValue) {
    let sortArry = Array.from(array);
    //从小到大
    sortArry = sortArry.sort(function (x, y) {
        return x - y;
    });
    function getMin(array) {
        let min = 0;
        for (let i = 0; i < array.length; i++) {
            if (!isNaN(array[i]) && array[i] !== missingValue) {
                min = array[i];
                break;
            } else {
                continue;
            }
        }
        return min;
    }
    function getMax(array) {
        let max = 0;
        for (let i = array.length - 1; i > 0; i--) {
            if (!isNaN(array[i]) && array[i] !== missingValue) {
                max = array[i];
                break;
            } else {
                continue;
            }
        }
        return max;
    }
    const min = getMin(sortArry);
    const max = getMax(sortArry);
    return [min, max];
}
function responseFile(filePath, response) {
    try {
        filePath = path.join(global.CONFIG.root, filePath)
        response.sendFile(filePath)
    } catch (e) {
        response.sendStatus(404)
    }
}
async function resolveTiff(tiffOriginPath, pngName, colorImageName, filePath) {
    const tiff = await getTiff(tiffOriginPath);
    const { png, bounds: bbox } = await parseTiffToCanvas(tiff, colorImageName);
    const file = fs.createWriteStream(filePath)
    png.pack().pipe(file);
    return new Promise((resolve) => {
        file.on('finish', () => {
            resolve(true)
        })
    })
}


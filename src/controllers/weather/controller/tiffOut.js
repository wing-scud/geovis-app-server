
var fs = require("fs-extra");
var path = require("path");
var GeoTIFF = require('../lib/geotiff');
const OGeoTIFF = require('geotiff');
const PNG = require('pngjs').PNG;

const { tiffBasePath, colorBasePath, cacheTiff: cachePath } = global.CONFIG['phenomenaConfig'].pathMap
const ncToGeoTiff = require('../tool/ncToGeotiff')
// const ncToGeoTiffBatch = require('../tool/ncToGeotiff_batchFiles')
// http://localhost:8099/tiffvis/tos_O1_2001-2002.tif?variable=tos&time=15&color=GIST_earth
// http://localhost:8099/tiffvis/ncep_global_353d_67d4_f1bf.tif?variable=rh2m&time=1609113600&color=NEO_modis_lst
// const baseName = "ncep_global_ed59_98e1_311b"
const queryParams = ['time'];
module.exports = async function handle(request, response) {
    const { color: colorImageName, variable: variableName, name } = request.body;
    let paramsObj = {};
    queryParams.map((key) => paramsObj[key] = request.body[key]);
    const keys = Object.keys(paramsObj)
    const values = Object.values(paramsObj);
    let colorParamsName = "color-" + colorImageName;
    let paramsName = "variable-" + variableName;
    keys.forEach((item, index) => {
        paramsName += "_" + item + "-" + values[index]
    })
    // 缓存寻找tiff
    const tiffName = `${name}_${colorParamsName}_${paramsName}.tif`
    const cacheTiffPath = path.join(cachePath, tiffName);
    try {
        if (fs.pathExistsSync(cacheTiffPath)) {
            console.log(cacheTiffPath)
            responseFile(cacheTiffPath, response);
        } else {
            // 缓存无png ，tiff转化
            const paramsPath = keys.join('/');
            //找到tif
            const tiffOriginPath = path.join(tiffBasePath, name, variableName, paramsPath, `${paramsName}.tif`);
            console.log(tiffOriginPath)
            if (!fs.pathExistsSync(tiffOriginPath)) {
                await ncToGeoTiff(name)
            }
            await resolveTiff(tiffOriginPath, tiffName, colorImageName, cacheTiffPath);
            responseFile(cacheTiffPath, response);
        }
    } catch (e) {
        console.log(e)
    }
}
async function parseTiffToArray(tiff, colorImageName) {
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();
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
    const array = new Array(width * height * 3);
    let pos = 0;
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            //点坐标
            const px = i;
            const py = j;
            let hasValue = true;
            if (Math.floor(px) >= 0 && Math.ceil(px) < image.getWidth() && Math.floor(py) >= 0 && Math.ceil(py) < image.getHeight()) {
                const value = tempData[py][px];
                const c = Math.round((scaleWidth - 1) * ((value - min) / (max - min)));
                // let alpha = 180;
                if (value > max || value < min || isNaN(value) || value === missingValue) {
                    // alpha = 0;
                    hasValue = false
                }
                if (c < 0 || c > scaleWidth - 1) {
                    // alpha = 0;
                    hasValue = false
                }
                if (hasValue) {
                    array[pos] = colorUCA[c * 4];
                    array[pos + 1] = colorUCA[c * 4 + 1];
                    array[pos + 2] = colorUCA[c * 4 + 2];
                } else {
                    array[pos] = 0;
                    array[pos + 1] = 0;
                    array[pos + 2] = 0;
                }
                // array[pos + 3] = alpha;
                pos = pos + 3;
            }
        }
    }
    const bounds = [bbox[0], bbox[1], bbox[2], bbox[3]];
    return { array, bounds, width, height, missingValue };
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
    const colorUCA = png.data.slice(half * width*4 + 1, 4*(half * width + 256) + 1);
    return colorUCA
}
async function getTiff(filePath) {
    const buffer = await fs.readFileSync(filePath);
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
        // 甄别file是否存在缓存
        response.sendFile(filePath);
        // response.end()
    } catch (e) {
        response.sendStatus(404)
    }
}

async function writeOGeoTiff(tiffData, filepath, { bbox, width, height }) {
    const bytes = 1;
    const tiffMeta = {
        height: height,
        ModelPixelScale: [(bbox[2] - bbox[0]) / width, (bbox[3] - bbox[1]) / height, 0],
        ModelTiepoint: [0, 0, 0, bbox[0], bbox[3], 0],
        width: width,
        GeoAsciiParams: "WGS 84",
        GeographicTypeGeoKey: 4326,
        SamplesPerPixel: 3,
        BitsPerSample: [bytes * 8, bytes * 8, bytes * 8],
        GDAL_NODATA: "[0,0,0]"
    };
    const arrayBuffer = await OGeoTIFF.writeArrayBuffer(tiffData, tiffMeta);
    const result = new DataView(arrayBuffer)
    fs.writeFileSync(filepath, result)
    console.log(filepath + "  write over")
}
async function writeGeoTiff(tiffData, filepath, { bbox, width, height }) {
    const bytes = 1;
    const tiffMeta = {
        height: height,
        ModelPixelScale: [(bbox[2] - bbox[0]) / width, (bbox[3] - bbox[1]) / height, 0],
        ModelTiepoint: [0, 0, 0, bbox[0], bbox[3], 0],
        width: width,
        GeoAsciiParams: "WGS 84",
        GeographicTypeGeoKey: 4326,
        SamplesPerPixel: 3,
        BitsPerSample: [bytes * 8, bytes * 8, bytes * 8],
        GDAL_NODATA: "[0,0,0]"
    };
    const arrayBuffer = await GeoTIFF.writeArrayBuffer(tiffData, tiffMeta, "new");
    const result = new DataView(arrayBuffer)
    await fs.writeFileSync(filepath, result)
}
async function resolveTiff(tiffOriginPath, tiffName, colorImageName, cacheTiffPath) {
    const tiff = await getTiff(tiffOriginPath);
    const { array: tiffArray, bounds: bbox, width, height } = await parseTiffToArray(tiff, colorImageName);
    // 保存到缓存
    await writeOGeoTiff(tiffArray, cacheTiffPath, { bbox, width, height })
}



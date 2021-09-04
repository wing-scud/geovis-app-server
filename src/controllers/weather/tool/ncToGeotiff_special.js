
const GeoTIFF = require('../lib/geotiff')
//const GeoTIFF =require('geotiff') 
const fetch = require('node-fetch')
const fs = require('fs')
// const gdal = require("gdal")
const NetCDFReader = require('netcdfjs');
//生成tiff路径
const generatePath = "./static/tiff/generate/world_oscar/"
//读取文件名称 
const file = "world_oscar_vel_5d1993"
// ncToGeoTiffSpecial(file)
function ncToGeoTiffSpecial(file) {
    const data = fs.readFileSync("./static/nc/" + file + ".nc");
    let latName = "latitude";//latitude lat 
    let lonName = "longitude"//longitude lon
    var reader = new NetCDFReader(data);
    const dimensions = reader.dimensions;
    const variables = reader.variables;
    if (!nameOfObjInObjs({ name: latName }, dimensions)) {
        latName = "lat";
        lonName = "lon"
    }
    //console.log(reader.globalAttributes)
    //console.log(dimensions)
    //console.log(variables)
    /**
     * 只针对 lon lat ，
     */
    //获取所有维度
    const [unitTime, baseTime] = getBaseTime(reader, 'time');
    console.log(unitTime, baseTime)
    const dimensionsValue = new Map();
    dimensions.map((dimension) => {
        nameOfObjInObjs(dimension, variables) && dimensionsValue.set(dimension.name, reader.getDataVariable(dimension.name));
    })
    const variablesValue = new Map();
    variables.map((variable) => {
        if (!dimensionsValue.get(variable.name)) {
            variablesValue.set(variable.name, reader.getDataVariable(variable.name))
        }
    })
    const lats = dimensionsValue.get(latName)
    const lons = dimensionsValue.get(lonName)
    const width = dimensionsValue.get(lonName).length;
    const height = dimensionsValue.get(latName).length;
    /**
     * 默认的所有顺序是从常见的x,y坐标轴，原点左下角，
     * 实际图像是 原点左上角，需要换一下y顺序
     * data内数据是按照lonlat数组给的，所以我得按照这个来取值，而不能直接给. 所以 所有的顺序都有问题
     */
    let minLon = Math.min(...lons);
    let maxLon = Math.max(...lons);
    let lonsLength = lons.length;
    let globalBool = globalLonJudge(minLon, maxLon, lonsLength)
    console.log("globalBool", globalBool);
    //将0-360 转为 0-180（-180）-0
    if (maxLon > 180) {
        if (minLon >= 180) {
            minLon = -180;
        }
        maxLon = maxLon - 360;
    }
    //TODO:bbox处理
    let bbox = [minLon, Math.min(...lats), maxLon, Math.max(...lats)];
    bbox = [-180, Math.min(...lats), 180, Math.max(...lats)];
    console.log(bbox)
    //寻找含有经度纬度 维度的变量
    const needResolveVariables = new Map();
    variablesValue.forEach((value, key) => {
        const variable = nameOfObjInObjs({ name: key }, variables);
        const dimValue = []
        variable.dimensions.map(index => {
            dimValue.push(dimensions[index].name)
        })
        if (dimValue.includes(lonName) && dimValue.includes(latName)) {
            const missing_value = getVariableMissValue(reader, key)
            value = yangliu(value, width, height)
            needResolveVariables.set(key, {
                array: value,
                dimension: dimValue,
                type: variable.type,
                missing_value: missing_value
            })
        }
    })
    console.log(needResolveVariables)
    //转为geotiff
    needResolveVariables.forEach(async (params, key) => {
        let lonlatRevert = false;
        const extraDimension = params.dimension.filter((item) => {
            if (item !== lonName && item !== latName) {
                return item;
            }
        })
        const type = params.type;
        if (params.dimension.indexOf(lonName) < params.dimension.indexOf(latName)) {
            lonlatRevert = true;
        }
        const bytes = getBytes(type)
        const format = bytes > 3 ? 3 : 1
        console.log(format)
        const tiffMeta = {
            height: height,
            ModelPixelScale: [(bbox[2] - bbox[0]) / width, (bbox[3] - bbox[1]) / height, 0],
            ModelTiepoint: [0, 0, 0, bbox[0], bbox[3], 0],
            width: width,
            GeoAsciiParams: "WGS 84",
            GeographicTypeGeoKey: 4326,
            SamplesPerPixel: 1,
            SampleFormat: format,
            GDAL_NODATA: params.missing_value.toString(),
            //MaxSampleValue:1.0000000200409e+20,
            //StripByteCounts: 4,
            BitsPerSample: [bytes * 8]
        };
        console.log(extraDimension)
        if (extraDimension.length === 0) {
            //只有经度纬度
            const array = params.array;
            console.log("无额外维度信息" + key)
            let tiffData = resolveVariableData(array, lons, lats);
            let filepath = generatePath + `${file}_${key}.tif`
            await writeGeoTiff(tiffData, tiffMeta, filepath, type)
        } else {
            /*额外的维度:二种情况
                 1. [[1,2],[3,4],[5]] ;
                 2. [1,2,3,4,5]
              此外：维度是递进的，
            */
            async function getdeepDimensionData(extras, index, data, fileName) {
                if (index >= extras.length) {
                    let tiffData = resolveVariableData(data, lons, lats)
                    if (tiffData && tiffData.length > 0) {
                        const filepath = generatePath + `${file}-${key}-${fileName}.tif`
                        await writeGeoTiff(tiffData, tiffMeta, filepath, type)
                    }
                    return;
                }
                const extra = extras[index];
                const values = dimensionsValue.get(extra);
                values.map((extraValue, extraValueIndex) => {
                    if (!fileName) {
                        fileName = ""
                    }
                    let array = data[extraValueIndex];
                    if (!array || !array.length || array.length === 0) {
                        //杂糅在一起
                        /***
                         * 国内的数据是[lon,lat,depth1],[lon,lat,depth2],把一个点的所有深度放在一起
                         * 国外是      [lon,lat,depth1],[lon,lat,depth1]，把一个面的相等深度放一起
                         */
                        console.log(`${key}--${extra}杂糅`)
                        let splitArray = []
                        //区别：这个维度的索引在经纬度前面还是后面
                        if (params.dimension.indexOf(extra) > params.dimension.indexOf(latName)) {
                            //国内数据处理
                            for (let i = 0; i < data.length; i += values.length - 1) {
                                splitArray.push(data[i + extraValueIndex])
                            }
                        } else {
                            //国外数据处理
                            splitArray = data.slice(extraValueIndex * width * height, (extraValueIndex + 1) * width * height)
                        }
                        //国内的数据是[lat,lon,]不是[lon,lat]
                        if (lonlatRevert) {
                            splitArray = geLonLattArray(width, height, splitArray)
                        }
                        array = splitArray
                    } else {
                        //颠倒顺序，上下
                        //console.log(`${key}--${extra}不杂糅`)
                    }
                    getdeepDimensionData(extras, index + 1, array, fileName + `-${extra}_${extraValue}`)
                })
            }
            getdeepDimensionData(extraDimension, 0, params.array);
        }
    })
}
function resolveVariableData(data, lons, lats) {
    let minLon = Math.min(...lons);
    let maxLon = Math.max(...lons);
    let lonsLength = lons.length;
    let globalBool = globalLonJudge(minLon, maxLon, lonsLength)
    const width = lons.length;
    const height = lats.length;
    const revert = lats[0] < lats[1]
    let revertData;
    revert ? (revertData = revertYArray(data, width, height)) : (revertData = data)
    console.log("revert",revert)
    let adjustLonData = revertData;
    if (globalBool) {
        adjustLonData = globalLonAdjust(revertData, width, height)
    }
    return adjustLonData
}
async function writeGeoTiff(tiffData, tiffMeta, filepath, type) {
    const arrayBuffer = await GeoTIFF.writeArrayBuffer(tiffData, tiffMeta, type);
    const result = new DataView(arrayBuffer)
    fs.writeFileSync(filepath, result)
    console.log(filepath + "   write over")
}
function nameOfObjInObjs(obj, objs) {
    let result = undefined;
    objs.map((value) => {
        if (value.name === obj.name) {
            result = value;
        }
    })
    return result;
}
function revertYArray(data, width, height) {
    let newData = new Array(data.length);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let index = (height - i - 1) * width + j;
            let actualIndex = i * width + j
            newData[actualIndex] = data[index]
        }
    }
    return newData;
}

//只针对全球的数据效果，将0-360转为 -180-180
//TODO ：只要是位于超出180的度数，均转化
function globalLonAdjust(data, width, height) {
    //将全球渲染顺序从0-360-> -180-180   
    let mid;
    let result = [];
    let loseTo0;
    let zeroToPositive;
    for (let i = 0; i < height; i++) {
        let globalLat = []
        if (width % 2 !== 0) {
            mid = (width + 1) / 2;
            let oneEight0 = data[mid - 1]
            globalLat.push(oneEight0)
            zeroToPositive = data.slice(i * width + 0, i * width + (mid - 1));
            loseTo0 = data.slice(i * width + mid, i * width + width);
        } else {
            mid = width / 2
            zeroToPositive = data.slice(i * width + 0, i * width + mid);
            loseTo0 = data.slice(i * width + mid, i * width + width);
        }
        globalLat = loseTo0.concat(zeroToPositive)
        result.push(...globalLat)
    }
    return result;
}
function globalLonJudge(min, max, width) {
    return  (max >= 360 - 360 / width)
    // return (min <= 0 + 360 / width) && (max >= 360 - 360 / width)
}
function getMaxMin(array, missing_value) {
    let sortArry = Array.from(array);
    //从小到大
    sortArry = sortArry.sort(function (x, y) {
        return x - y;
    });
    function getMin(array) {
        let min = 0;
        for (let i = 0; i < array.length; i++) {
            if (!isNaN(array[i]) && array[i] !== missing_value) {
                min = array[i]
                break
            } else {
                continue;
            }
        }
        console.log("min", min)
        return min;
    }
    function getMax(array) {
        let max = 0;
        for (let i = array.length - 1; i > 0; i--) {
            if (!isNaN(array[i]) && array[i] !== missing_value) {
                max = array[i]
                break
            } else {
                continue;
            }
        }
        console.log("max", max)
        return max;
    }
    const min = getMin(sortArry);
    const max = getMax(sortArry);
    console.log(`${min}----${max}`)
    return [min, max]
}
function getVariableMissValue(reader, name) {
    const variable = getVariableAttribute(reader, name);
    let missValueObj = nameOfObjInObjs({ name: "missing_value" }, variable.attributes)
    if (!missValueObj) {
        missValueObj = { value: NaN }
    }
    return missValueObj.value;
}
function getVariableAttribute(reader, name) {
    const variables = reader.variables;
    let variable;
    variables.forEach((obj) => {
        if (obj.name === name) {
            variable = obj;
        }
    })
    return variable
}
/**
 * 获取revertLonLat
 * 原数组是内侧lat，再lon
 * 实际使用是先lon，再lat
 */
function geLonLattArray(width, height, array) {
    const revertArray = new Array(width * height)
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let index = i * height + j;
            let newIndex = (height - j - 1) * width + i
            revertArray[newIndex] = array[index]
        }
    }
    return revertArray;
}

function getBytes(type) {
    let bytes = 0;
    switch (type) {
        case 'float':
            bytes = 4;
            break;
        case 'double':
            bytes = 8;
            break;
        case 'int':
            bytes = 4;
            break;
        case 'short':
            bytes = 2;
            break;
        case 'char':
            bytes = 1;
            break;
        default:
            bytes = 0;
    }
    return bytes;
}
//处理时间 hour since 1800-01-01 00:00:0.0
function getBaseTime(reader) {
    const timeAttribute = getVariableAttribute(reader, 'time');
    const valueString = nameOfObjInObjs({ name: 'units' }, timeAttribute.attributes).value//'hours since 1800-01-01 00:00:0.0
    let strArray = valueString.split('since');
    let unit = strArray[0].trim();
    let baseTime = new Date(strArray[1])
    return [unit, baseTime];
}
function getTime(interval, unitName, baseTime) {
    let timeUnit
    switch (unitName) {
        case 'hours':
            timeUnit = 3600 * 1000
            break;
        case 'days':
            timeUnit = 24 * 3600 * 1000
            break;
        case 'months':
            timeUnit = 31 * 24 * 3600 * 1000
            break; //简化
        default:
            break;
    }
    const resultMillSeconds = baseTime.getTime() + interval * timeUnit;
    const result = new Date(resultMillSeconds);
    return result.toDateString();
}
function yangliu(data, width, height) {
    //丢弃 380-420；
    const lonUint = width / 360;
    let result=[];
    for (let k = 0; k < data.length / width; k++) {
            const data20_360_20 = data.slice(k* width, k * width+width)
            //const data20_360_20 = data.slice(0, (Math.round(lonUint * 360)) * height)
            //将20-360 -20转为 0-360
            //得到20-340
            const data20_360 = data20_360_20.slice(0, Math.round(340 * lonUint))
            //得到0-20
            const data0_20 = data20_360_20.slice(Math.round(lonUint * 340), data20_360_20.length)
            let data0_360 = data0_20.concat(data20_360)
            result.push(...data0_360)
    }
    return result;
}
module.exports  =ncToGeoTiffSpecial;
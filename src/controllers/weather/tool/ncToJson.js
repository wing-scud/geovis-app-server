
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs')
const NetCDFReader = require('netcdfjs');
/**
 * 默认nc里面只有uv二个分量的数据，也只处理uv这两个分量的数据
 * @param {*} file 
 * @returns 
 */
let lons, lats;
// ncToJson("ncep_global_7155_7bd2_4a42")
const configPhenomena = global.CONFIG['phenomenaConfig'];
const { baseMapoxPath:generatePath, baseNcPath } = configPhenomena.pathMap
function ncToJson(file) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(path.join(baseNcPath,file + ".nc"));
        let latName = "latitude";//latitude lat 
        let lonName = "longitude"//longitude lon
        var reader = new NetCDFReader(data);
        const dimensions = reader.dimensions;
        const variables = reader.variables;
        if (!nameOfObjInObjs({ name: latName }, dimensions)) {
            latName = "lat";
            lonName = "lon"
        }
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
        lats = dimensionsValue.get(latName)
        lons = dimensionsValue.get(lonName)
        let width = dimensionsValue.get(lonName).length;
        let height = dimensionsValue.get(latName).length;
        /**
         * 默认的所有顺序是从常见的x,y坐标轴，原点左下角，
         * 实际图像是 原点左上角，需要换一下y顺序
         * data内数据是按照lonlat数组给的，所以我得按照这个来取值，而不能直接给. 所以 所有的顺序都有问题
         */
        let minLon = Math.min(...lons);
        let maxLon = Math.max(...lons);
        let lonsLength = lons.length;
        let globalBool = globalLonJudge(minLon, maxLon, lonsLength)
        // console.log("globalBool", globalBool);
        // if (maxLon > 180) {
        //     if (minLon >= 180) {
        //         minLon = -180;
        //     }
        //     maxLon = maxLon - 180;
        // }
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
                needResolveVariables.set(key, {
                    array: value,
                    dimension: dimValue,
                    type: variable.type,
                    missing_value: missing_value
                })
            }
        })
        needResolveVariables.forEach((params, key) => {
            let lonlatRevert = false;
            const extraDimension = params.dimension.filter((item) => {
                if (item !== lonName && item !== latName) {
                    return item;
                }
            });
            const type = params.type;
            if (params.dimension.indexOf(lonName) < params.dimension.indexOf(latName)) {
                lonlatRevert = true;
            }
            console.log(extraDimension)
            let extraDimensionPath = extraDimension.join('/');
            let direPath = path.join(generatePath, file, key, extraDimensionPath);
            fs.mkdirSync(direPath, { recursive: true });
            let variableName = "variable-" + key
            if (extraDimension.length === 0) {
                //只有经度纬度
                const array = params.array;
                // 数组
                let tiffData = resolveVariableData(array, lons, lats);
                let fileName = variableName;
                const [min, max] = getMaxMin(tiffData, params.missing_value)
                writeJson(fileName, tiffData, {
                    width, height, min, max, bbox,
                    direPath,
                })
            } else {
                function getdeepDimensionData(extras, index, data, fileName) {
                    if (index >= extras.length) {
                        let tiffData = resolveVariableData(data, lons, lats)
                        if (tiffData && tiffData.length > 0) {
                            fileName = variableName + fileName;
                            const [min, max] = getMaxMin(tiffData, params.missing_value)
                            writeJson(fileName, tiffData, {
                                width, height, min, max, bbox, direPath
                            })
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
                            let splitArray = []
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
                        getdeepDimensionData(extras, index + 1, array, fileName + `_${extra}-${extraValue}`)
                    })
                }
                getdeepDimensionData(extraDimension, 0, params.array);
            }
        })
        resolve(true)
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
    //  console.log("revert",revert)
    let adjustLonData = revertData;
    if (globalBool) {
        adjustLonData = globalLonAdjust(revertData, width, height)
    }
    return adjustLonData
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

//针对全球的数据效果，将0-360转为 -180-180
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
    return (min <= 0 + 360 / width) && (max >= 360 - 360 / width)
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
        // console.log("min", min)
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
        // console.log("max", max)
        return max;
    }
    const min = getMin(sortArry);
    const max = getMax(sortArry);
    // console.log(`${min}----${max}`)
    return [min, max]
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
//只写一个
function writeJson(fileName, data, options) {
    const { width, height, variable, min, max, bbox,
        direPath } = options;
    const jsonName = path.join(direPath, fileName + '.json')
    fs.writeFileSync(jsonName, JSON.stringify({
        header: {
            source: 'http://nomads.ncep.noaa.gov',
            nx: width,
            ny: height,
            extent: bbox,
            variable: variable,
            min: min,
            max: max,
            lo1: bbox[0],
            lo2: bbox[2],
            la1: bbox[1],
            la2: bbox[3],
            "dx": lons[1] - lons[0],
            "dy": lats[1] - lats[0],
        },
        data: data
    }, null, 2) + '\n');
}
module.exports = ncToJson;
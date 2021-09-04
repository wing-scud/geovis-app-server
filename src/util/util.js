var uuid = require('node-uuid');
const mime = require('mime')
const path = require('path')
const fs =require('fs-extra')
var formatDate = function (secs, format) {
    // console.log("日期", format(1505729264599, "yyyy-MM-dd hh:mm:ss"));
    var t = new Date(secs);
    var date = {
        "M+": t.getMonth() + 1,
        "d+": t.getDate(),
        "h+": t.getHours(),
        "m+": t.getMinutes(),
        "s+": t.getSeconds(),
        "q+": Math.floor((t.getMonth() + 3) / 3),
        "S+": t.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(
            RegExp.$1,
            (t.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }

    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? date[k]
                    : ("00" + date[k]).substr(("" + date[k]).length)
            );
        }
    }
    return format;
};

/**
 * deeply copy object or  arrays with nested attributes
 * @param  {any} obj
 * @return {any}     a depply copied replica of arguement passed
 */
const deepClone = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    let newObj = {};
    if (Array.isArray(obj)) {
        newObj = obj.map(item => deepClone(item));
    } else {
        Object.keys(obj).forEach((key) => {
            return newObj[key] = deepClone(obj[key]);
        })
    }
    return newObj;
}

/**
 * 快速排序,从小到大排列数组
 * @param  Array  arr   要排序的数组
 * @return Array        完成排序的数组
 */
var quickSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    } //检查数组的元素个数，如果小于等于1，就返回。
    //接着，选择"基准"（pivot），并将其与原数组分离，再定义两个空数组，用来存放一左一右的两个子集。

    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    //然后，开始遍历数组，小于"基准"的元素放入左边的子集，大于基准的元素放入右边的子集。

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) { left.push(arr[i]); } else { right.push(arr[i]); }
    }
    //最后，使用递归不断重复这个过程，就可以得到排序后的数组。
    return quickSort(left).concat([pivot], quickSort(right));
};
function objectIdToTimestamp(objectId) {
    try { objectId = objectId.toString(); } catch (e) { }
    if (!/^[0-9a-z]{24}$/.test(objectId)) {
        throw new TypeError('Invalid objectId, got ' + JSON.stringify(objectId));
    }
    return parseInt(objectId.slice(0, 8), 16) * 1000 +
        Math.floor(parseInt(objectId.slice(-6), 16) / 16777.217); // convert 0x000000 ~ 0xffffff to 0 ~ 999
};
function createId() {
    return uuid.v1();
}
function resolveFullPath(fullPath) {
    let splitSymbol = fullPath.indexOf('/');
    splitSymbol = splitSymbol ? '/' : `\\`;
    const splitArray = fullPath.split(splitSymbol);
    const fileName = splitArray[splitArray.length - 1];
    const filePath = splitArray.slice(0, splitArray.length - 1).join('/');
    return { filePath, fileName }
}
function getFileSuffix(fileName) {
    const array = fileName.split('.')
    return "." + array[array.length - 1]
}

// 使用mime获取文件类型，split（.）容易bug
/**
 * 从临时路径中保存文件
 */
function saveFileFromTemp(dirPath, fileName, tempPath) {
    const fullPath = path.join(global.CONFIG.root, dirPath, fileName);
    let file = fs.readFileSync(tempPath);
    fs.writeFileSync(fullPath, file);
    return fullPath
}
function getSuffixFromMime(type) {
    return mime.getExtension(type)
}
module.exports = { formatDate, deepClone, quickSort, objectIdToTimestamp, createId, resolveFullPath, getFileSuffix, saveFileFromTemp, getSuffixFromMime }
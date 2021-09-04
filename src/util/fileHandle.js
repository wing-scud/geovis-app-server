const path = require('path');
const fs = require('fs-extra')
const multer = require('multer');
const { createId ,getFileSuffix} = require('./util.js');
const tempFilePath = global.CONFIG.tempFilePath
function imageHandle() {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, tempFilePath)
        },
        filename: function (req, file, cb) {
            // 已经注册的，再次注册，可能头像会被替换
            const type = getFileSuffix(file.originalname);
            const id = createId()
            cb(null, id  + type)
        }
    })
    var upload = multer({ storage: storage })
    return upload
}

module.exports = imageHandle;
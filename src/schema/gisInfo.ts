
const fileSchema = require('./file.ts')
var mongoose = require('mongoose');

/**
 * createTime: yyyy-MM-dd hh:mm:ss
 */
const schema = new mongoose.Schema({
    account: String,
    title: String,
    describe: {
        type: String,
        default: ""
    },
    fileList: {
        type: [fileSchema],
        default: []
    },
    position: {
        locationName:String,
        lngLat:String
    },
    status: Boolean,
    createTime: String
}, { versionKey: false })
if (!schema.options.toObject) schema.options.toObject = {};
schema.options.toObject.transform = function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id;
    delete ret.account;
    return ret;
}
module.exports = schema;

const fs = require('fs-extra')
var mongoose = require('mongoose');

/**
 * createTime: yyyy-MM-dd hh:mm:ss
 */
const schema = new mongoose.Schema({
    fileName: String,
    storageName: String,
    fullPath: String,
})
if (!schema.options.toObject) schema.options.toObject = {};
// schema.pre('save', function (next) {
//     if (this.fullPath && fs.pathExistsSync(this.fullPath)) {
//         fs.writeFileSync(this.fullPath,)
//         next();
//     }else{
//         throw new Error('fullPath不存在');
//     }
// });

schema.options.toObject.transform = function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id;
    delete ret.storageName;
    delete ret.fullPath;
    return ret;
}
module.exports = schema;
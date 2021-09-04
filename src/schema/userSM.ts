// 专门存放用户的junshi 信息

const mongoose = require('mongoose');
/**
 * 用户基本信息
 */
const schema = new mongoose.Schema({
    account: {
        type: String,
        unique: true
    },
    // 代号
    codename: {
        type: String,
        default: 'xiaofeiji'
    },
    // 属于的任务小组
    group: {
        type: String,
        default: "未分配"
    },
    // 级别，表示对系统的查看和使用级别
    level: {
        type: Number,
        default: 1
    }
});
if (!schema.options.toObject) schema.options.toObject = {};
//@ts-ignore
schema.options.toObject.transform = function (doc, ret, options) {
    delete ret._id;
    return ret;
}
module.exports = schema;
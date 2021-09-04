const mongoose = require('mongoose');
const path = require('path')
const root = path.resolve('../')
const { resolveFullPath } = require('../util/util.js')
/**
 * 用户基本信息
 */
const schema = new mongoose.Schema({
    account: {
        type:String,
        unique:true
    },
    nickname: {
        type: String,
        default: '默认用户'
    },
    password: {
        type: String,
        default: "123456"
    },
    rememberMe: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    tel: String,
    token: String,
    profilePhoto: {
        type: String,
        default: path.join(root, 'public/user/profilePhoto/default.jpg')
    },
    postCode: {
        type: String,
        default: "215000"
    },
    sex: {
        type: String,
        default: 'man'
    },
    birthday: String,
    createTime: String,
});
if (!schema.options.toObject) schema.options.toObject = {};
//@ts-ignore
schema.options.toObject.transform = function (doc, ret, options) {
    delete ret._id;
    //@ts-ignore
    const { fileName } = resolveFullPath(ret.profilePhoto);
    ret.profilePhoto = fileName
    return ret;
}
module.exports = schema;
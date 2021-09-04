const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    account: String,
    position: [],
    history: {
        type: [{
            position: Array,
            createTime: String,
        }],
        default: []
    },
}, { versionKey: false })
if (!schema.options.toObject) schema.options.toObject = {};
schema.options.toObject.transform = function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id;
    // ret.account;
    return { position: ret.position, account: ret.account };
}
module.exports = schema;
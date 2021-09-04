const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: Number,
    account: String,
    place: {
        location: Array,
        name: String,
    },
}, { versionKey: false })
if (!schema.options.toObject) schema.options.toObject = {};
schema.options.toObject.transform = function (doc, ret, options) {
    delete ret._id;
    return ret;
}
module.exports = schema
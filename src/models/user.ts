const mongoose = require('mongoose');
const userSchema = require('../schema/user.ts');
const User = mongoose.model('User', userSchema);
module.exports = User;
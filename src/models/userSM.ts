const mongoose = require('mongoose');
const userSMSchema = require('../schema/userSM.ts');
const UserSM = mongoose.model('UserSM', userSMSchema);
module.exports = UserSM;
const express = require('express')
const fs = require('fs-extra')
const userRouter = express.Router();
const configUser = JSON.parse(fs.readFileSync('public/static/user/user-config.json'))
global.CONFIG['configUser'] = configUser;
const imageHandle = require('../../util/fileHandle.js');
//JSON Web Token
/**
 * User的注册和头像修改请求类型是multipart/form-data
 */
userRouter.use('/login', require('./controller/login.js'));
userRouter.use('/loginOut', require('./controller/loginOut.js'));

userRouter.use('/register', imageHandle().single('profilePhoto'), require('./controller/register.js'))

userRouter.use('/getProfilePhoto', require('./controller/getProfilePhoto.js'))
userRouter.use('/setProfilePhoto', imageHandle().single('profilePhoto'), require('./controller/setProfilePhoto.js'))
userRouter.use('/updateUserInfo', require('./controller/updateUserInfo.js'))
module.exports = userRouter;
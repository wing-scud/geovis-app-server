const User = require('../../../models/user.ts');
const path = require('path');
const fs = require('fs-extra')
const sha1 = require('sha1');
const multer = require('multer');
const { formatDate, createId ,getFileSuffix} = require('../../../util/util.js')
module.exports = async function handle(req, res) {
    const tempPath = req.file.path;
    const { account, nickname, sex, birthday, area } = req.body;
    const password = req.body.password; //加密password
    // const password = sha1(req.body.password);
    // 校验是否已经注册过
    const result = await User.findOne({ account: account });
    if (result) {
        res.json({
            message: "账户已注册，请登录",
            success: false
        })
        return;
    }
    let profilePhotoPath = global.CONFIG['configUser'].profilePhotoPath;
    const fileName = createId() +  getFileSuffix(tempPath)
    const profilePhoto = path.join(global.CONFIG.root, profilePhotoPath, fileName);
    let image = fs.readFileSync(tempPath);
    fs.writeFileSync(profilePhoto, image)
    const createTime = formatDate(Date.now(), "yyyy-MM-dd hh:mm");
    //无 rememberMe token
    const user = new User({
        account,
        nickname,
        password,
        area,
        sex,
        profilePhoto,
        birthday,
        createTime
    });
    user.save((error, user) => {
        if (error) {
            handleError(err);
            res.json({
                message: "发生意外错误,请重试",
                success: false
            })
        } else {
            res.json({
                message: "注册成功",
                success: true
            })
        }
    })
}

const { checkToken } = require("../../../util/token.js");
const path = require('path')
const fs = require('fs-extra');
const { createId, getFileSuffix } = require('../../../util/util.js')
module.exports = async function handle(req, res) {
    const result = await checkToken(req);
    if (typeof result === "string") {
        res.json({
            success: false,
            message: result
        })
    } else {
        const user = result;
        const tempPath = req.file.path;
        const profilePhotoPath = global.CONFIG['configUser'].profilePhotoPath;
        const fileName = createId() + getFileSuffix(tempPath);
        // 删除原来的
        const originPath = user.profilePhoto
        const profilePhoto = path.join(global.CONFIG.root, profilePhotoPath, fileName);
        let image = fs.readFileSync(tempPath);
        fs.writeFileSync(profilePhoto, image);
        user.set({ profilePhoto });
        user.save((error, updatedUser) => {
            fs.rm(originPath)
            res.json({
                message: "设置成功",
                success: true
            })
        })
    }
}
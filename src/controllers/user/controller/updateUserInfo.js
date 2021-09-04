const User = require('../../../models/user.ts');
const path = require('path');
const fs = require('fs-extra')
const { checkToken } = require('../../../util/token.js');
const sha1 = require('sha1')
module.exports = async function handle(req, res) {
    const result = await checkToken(req);
    if (typeof result === "string") {
        res.json({
            message: result,
            success: false
        })
    } else {
        const user = result;
        const totalParams = Object.keys(User.Schema.obj);
        const incomingParams = {}
        totalParams.forEach((key) => {
            let value = req.body[key];
            if (key === "password") {
                value = sha1(value)
            }
            value && (incomingParams[key] = value);
        })
        user.set(incomingParams);
        user.save((error,updatedUser)=>{
            res.json({
                message:"信息更新成功",
                success:true
            })
        })
    }
}
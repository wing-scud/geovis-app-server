const User = require('../../../models/user.ts');

const sha1 = require('sha1');
const { createToken } = require('../../../util/token.js');

module.exports = function resolve(req, res) {
    const account = req.body.account;
    const rememberMe = req.body.rememberMe;
    const password = req.body.password; //加密password
    // const password = sha1(req.body.password); //加密password
    User.findOne({
        account: account
    })
        .then(user => {
            if (!user) {
                res.json({
                    success: false,
                    message: "账号不存在"
                })
            } else if (password === user.password) {
                user.set({ token: createToken(account, rememberMe), rememberMe: rememberMe });
                user.save(function (err, updatedUser) {
                    if (err) return handleError(err);
                    res.json({
                        success: true,
                        message: "登录成功",
                        user: updatedUser.toObject(),
                    })
                })
            } else {
                res.json({
                    success: false,
                    message: "密码错误"
                })
            }
        })
        .catch(err => res.json(err))
}
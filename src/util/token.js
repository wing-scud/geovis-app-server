const User = require('../models/user.ts');
const jwt = require('jsonwebtoken');

const configUser = global.CONFIG.configUser;
const tempTime = configUser.jwtTempTime;
const longTime = configUser.jwtLongTime;
const secret = configUser.jwtSecret;
function createToken(account, rememberMe) {
    const time = rememberMe ? longTime : tempTime;
    return jwt.sign({ account: account }, secret, {
        expiresIn: time
    })
}
async function checkToken(res) {
    if (res.headers['authorization']) {
        let token = res.headers['authorization'].split(' ')[1]
        // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
        let decoded = jwt.decode(token)
        const user = await User.findOne({ account: decoded['account'] })
        if (token !== user.token || decoded.exp <= Date.now() / 1000) {
            return "token过期,重新登录"
        } else {
            return user
        }
    } else {
        return "无token携带"
    }
}
async function checkSocketToken(socket){
    const bearerToken = socket.handshake.auth.token;
    if (bearerToken) {
        let token = bearerToken.split(' ')[1]
        // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
        let decoded = jwt.decode(token)
        const user = await User.findOne({ account: decoded['account'] })
        if (token !== user.token || decoded.exp <= Date.now() / 1000) {
            return "token过期,重新登录"
        } else {
            return user
        }
    } else {
        return "无token携带"
    }
}
module.exports = { checkToken, createToken,checkSocketToken }
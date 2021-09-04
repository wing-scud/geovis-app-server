const express = require('express')
const fs = require('fs-extra')
const { checkSocketToken } = require("../../util/token.js");
const positionHandle = require('./controller/position.js')
async function validateToken(socket, next) {
    const result = await checkSocketToken(socket);
    if (typeof result === "string") {
        const err = new Error("not authorized");
        err.data = { content: "Please retry later" }; // 附加细节  
        next(err);
    } else {
        socket.data.user = result;
        next()
    }
}
function handles(io) {
    const stateShareRouter = express.Router();
    io.of('/stateShare/position').use(validateToken).on('connection', positionHandle)
    return stateShareRouter
}
module.exports = handles;



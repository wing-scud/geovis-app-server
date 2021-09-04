
const { checkToken } = require("../../../util/token.js")
module.exports = async function handle(req, res) {
    const result = await checkToken(req);
    if(typeof result ==="string"){
        res.json({
            success: false,
            message: result
        })
    }else{
        const filePath = result.profilePhoto;
        res.sendFile(filePath);
    }
}
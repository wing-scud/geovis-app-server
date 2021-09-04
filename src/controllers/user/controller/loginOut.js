const { checkToken } = require('../../../util/token.js')
module.exports = async function handle(req, res) {
    const result = await checkToken(req);
    if (typeof result === "string") {
        res.json({
            message: result,
            success: false
        })
    } else {
        result.token="";
        result.save((error,updatedUser)=>{
            if(error){
                res.json({
                    success:false,
                    message:"意外中断,请重试"
                })
                return 
            }
            res.json({
                success:true,
                message:"退出登录成功"
            })
        })
    }
}

const StaredRoute = require('../../../models/staredRoute.ts')
module.exports = function handle(req, res) {
    const { type, user } = req.body;
    const account = user.account
    switch (type) {
        case 'save':
            const route = req.body.route;
            new StaredRoute({ account, route }).save((error, staredRoute) => {
                if (error) {
                    res.json({
                        message: "意外中断，请重试",
                        success: false
                    })
                    return;
                }
                res.json({
                    message: "收藏成功",
                    success: true,
                    data:staredRoute.toObject({virtuals:true})
                })
            })
            break;
        case 'remove':
            const id = req.body.id;
            StaredRoute.remove({ _id: id }, (error) => {
                if (error) {
                    res.json({
                        message: "意外中断，请重试",
                        success: false
                    })
                    return;
                }
                res.json({
                    message: "取消收藏成功",
                    success: true,
                })
            })
            break;
        default:
            //get
            StaredRoute.find({ account: account }, (error, staredRoutes) => {
                if (error) {
                    res.json({
                        message: "意外中断，请重试",
                        success: false
                    })
                    return;
                }
                res.json({
                    message: "获取列表成功",
                    success: true,
                    data: staredRoutes.map(route =>route.toObject({  virtuals: true })
                    )
                })
            })
            break;
    }
}
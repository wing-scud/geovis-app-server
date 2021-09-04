
const StaredPlace = require('../../../models/staredPlace.ts')
module.exports = function handle(req, res) {
    const { type, user } = req.body;
    const account = user.account;
    const id = req.body.id;
    switch (type) {
        case 'save':
            const place = req.body.place;
            StaredPlace.findOne({ account, place, id: id }, function (error, existedPlace) {
                if (!error && !existedPlace) {
                    new StaredPlace({ account, place, id: id }).save((error, staredPlace) => {
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
                        })
                    })
                } else if (existedPlace) {
                    res.json({
                        message: "已存在,重复收藏",
                        success: true,
                    })
                }
            })
            break;
        case 'remove':
            StaredPlace.findOneAndRemove({ id: id, account: account }, (error, removedPlace) => {
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
            //get list
            StaredPlace.find({ account: account }, (error, staredPlaces) => {
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
                    data: staredPlaces.map(place => place.toObject())
                })
            })
            break;
    }
}
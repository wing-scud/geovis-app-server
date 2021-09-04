
const PlotScene = require('../../../models/plotScene.ts');
const path = require('path');
const fs = require('fs-extra')
const { createId,getFileSuffix } = require('../../../util/util.js')
module.exports = function handle(req, res) {
    const { type, user } = req.body;
    const account = user.account;
    switch (type) {
        case 'save':
            const tempPath = req.file.path;
            const name = req.body.name;
            const createTime = req.body.createTime;
            const plotSceneFilePath = global.CONFIG['configConserve'].plotSceneFilePath;
            const fileName = createId() +getFileSuffix(tempPath);
            const storagePlotScenePath = path.join(global.CONFIG.root, plotSceneFilePath, fileName);
            let buffer = fs.readFileSync(tempPath);
            fs.writeFileSync(storagePlotScenePath, buffer);
            new PlotScene({ account, name, jsonPath: storagePlotScenePath, createTime }).save((error, plotScene) => {
                if (error) {
                    res.json({
                        message: "意外中断，请重试",
                        success: false
                    })
                    return;
                }
                res.json({
                    message: "保存成功",
                    success: true,
                })
            })
            break;
        case 'remove':
            const id = req.body.id;
            PlotScene.deleteOne({ _id: id }, (error) => {
                if (error) {
                    res.json({
                        message: "意外中断，请重试",
                        success: false
                    })
                    return;
                }
                res.json({
                    message: "删除成功",
                    success: true,
                })
            })
            break;
        case 'getFile':
            const _id = req.body.id;
            PlotScene.findById(_id, (error, plotScene) => {
                if (error) {
                    res.json({
                        message: "意外中断，请重试",
                        success: false
                    })
                    return;
                }
                res.sendFile(plotScene.jsonPath)
            })
            break;
        default:
            //get list 
            PlotScene.find({ account }, (error, plotScenes) => {
                if (error) {
                    res.json({
                        message: "意外中断，请重试",
                        success: false
                    })
                    return;
                }
                res.json({
                    data: plotScenes.map((item) => {
                        return {
                            id: item._id,
                            name: item.name,
                            createTime: item.createTime
                        }
                    })
                })
            })
            break;
    }
}
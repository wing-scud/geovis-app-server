/**
 * 文件获取，通过唯一的文件名 ，访问文件储存位置，拿到唯一的文件
 */
const fs = require('fs-extra');
const Trail = require('../../../models/trail.ts');
const path = require('path')
const { saveFileFromTemp, createId, getFileSuffix, getSuffixFromMime } = require('../../../util/util.js');
const trailPath = global.CONFIG['configConserve'].trailPath;
const rootPath = global.CONFIG.root;
module.exports = async function handle(req, res) {
    const { type, user } = req.body;
    const account = user.account;
    const id = req.body.id;
    switch (type) {
        case 'add':
            const {
                title,
                describe,
                startTime,
                trailTime,
                distance,
                createTime,
            } = req.body;
            const trail = {
                account: account,
                title, describe,
                startTime,
                trailTime,
                distance,
                createTime
            }
            const file = req.file;
            const existBool = await Trail.exists({ title: title, account: account })
            if (existBool) {
                res.json({
                    success: false,
                    message: "重复标题"
                })
            } else {
                let fileModel;
                if (file) {
                    const fileName = file.originalname;
                    const storageName = createId() + "." + getSuffixFromMime(file.mimetype)
                    const fullPath = saveFileFromTemp(trailPath, storageName, file.path);
                    fileModel = {
                        storageName, fileName, fullPath
                    }
                }
                trail.geojsonFile = fileModel
                const createdTrail = await Trail.create(trail)
                res.json({
                    success: true,
                    message: "添加成功",
                    data: createdTrail.toObject()
                })
            }
            break;
        case 'getFile':
            const fileId = req.body.fileId;
            const trailModel = await Trail.findById(id);
            const fileModel = trailModel.geojsonFile;
            const { fullPath, storageName } = fileModel;
            res.sendFile(fullPath)
            break;
        case 'remove':
            const removedTrail = await Trail.findByIdAndRemove(id)
            const filesModel = removedTrail.geojsonFile;
            filesModel.forEach((item) => {
                const fullPath = item.fullPath;
                fs.rm(fullPath)
            })
            res.json({
                message: "删除成功",
                success: true,
            })
            break;
        // // 表单提交整个
        // case 'edit':
        //     const trailModel = await Trail.findById(id);
        //     let removedFileIds = req.body.removedFileIds ?? [];
        //     if (typeof removedFileIds === "string") {
        //         removedFileIds = [removedFileIds]
        //     }
        //     const addFiles = req.files ?? [];
        //     const fileListModel = gisInfoModel.fileList;
        //     removedFileIds.forEach((id) => {
        //         fileListModel.id(id).remove()
        //     })
        //     addFiles.forEach((file) => {
        //         const fileName = file.originalname;
        //         const storageName = createId() + "." + getSuffixFromMime(file.mimetype)
        //         const fullPath = saveFileFromTemp(trailPath, storageName, file.path);
        //         fileListModel.push({
        //             fileName, storageName, fullPath
        //         })
        //     });
        //     req.body.title && (gisInfoModel.title = req.body.title)
        //     req.body.describe && (gisInfoModel.describe = req.body.describe)
        //     req.body.status && (gisInfoModel.status = req.body.status)
        //     req.body.lngLat && (gisInfoModel.position.lngLat = req.body.lngLat)
        //     req.body.locationName && (gisInfoModel.position.name = req.body.locationName)
        //     const updatedModel = await gisInfoModel.save();
        //     updatedModel && res.json({
        //         success: true,
        //         message: "修改成功",
        //         data: updatedModel.toObject()
        //     })
        //     break;
        default:
            //get list
            const trailModels = await Trail.find({ account: account });
            res.json({
                message: "获取列表成功",
                success: true,
                data: trailModels.map(trail => trail.toObject())
            })
            break;
    }
}
/**
 * 文件获取，通过唯一的文件名 ，访问文件储存位置，拿到唯一的文件
 */
const fs = require('fs-extra');
const GisInfo = require('../../../models/gisInfo.ts');
const path = require('path')
const { saveFileFromTemp, createId, getFileSuffix, getSuffixFromMime } = require('../../../util/util.js');
const infoPath = global.CONFIG['configConserve'].gisInfoPath;
const rootPath = global.CONFIG.root;
module.exports = async function handle(req, res) {
    const { type, user } = req.body;
    const account = user.account;
    const id = req.body.id;
    switch (type) {
        case 'add':
            const {
                describe,
                status,
                title,
                locationName,
                lngLat,
                createTime,
            } = req.body;
            const info = {
                account: account,
                title,
                describe,
                position: {
                    locationName,
                    lngLat
                },
                status,
                createTime
            }
            const files = req.files;
            const existBool = await GisInfo.exists({ title: title, account: account })
            if (existBool) {
                res.json({
                    success: false,
                    message: "重复标题"
                })
            } else {
                // 处理file
                let fileList = null
                if (files) {
                    fileList = files.map((file) => {
                        const fileName = file.originalname;
                        const storageName = createId() + "." + getSuffixFromMime(file.mimetype)
                        const fullPath = saveFileFromTemp(infoPath, storageName, file.path);
                        return {
                            storageName, fileName, fullPath
                        }
                    })
                }
                info.fileList = fileList
                const createdGisInfo = await GisInfo.create(info)
                res.json({
                    success: true,
                    message: "添加成功",
                    data: createdGisInfo.toObject()
                })
            }
            break;
        case 'getFile':
            const fileId = req.body.fileId;
            const gisInfo = await GisInfo.findById(id);
            const fileModel = gisInfo.fileList.id(fileId);
            const { fullPath, storageName } = fileModel;
            res.sendFile(fullPath)
            break;
        case 'remove':
            const removedGisInfo = await GisInfo.findByIdAndRemove(id)
            const filesModel = removedGisInfo.fileList;
            filesModel.forEach((item) => {
                const fullPath = item.fullPath;
                fs.rm(fullPath)
            })
            res.json({
                message: "删除成功",
                success: true,
            })
            break;
        // 表单提交整个
        case 'edit':
            const gisInfoModel = await GisInfo.findById(id);
            let removedFileIds = req.body.removedFileIds ?? [];
            if (typeof removedFileIds === "string") {
                removedFileIds = [removedFileIds]
            }
            const addFiles = req.files ?? [];
            const fileListModel = gisInfoModel.fileList;
            removedFileIds.forEach((id) => {
                fileListModel.id(id).remove()
            })
            addFiles.forEach((file) => {
                const fileName = file.originalname;
                const storageName = createId() + "." + getSuffixFromMime(file.mimetype)
                const fullPath = saveFileFromTemp(infoPath, storageName, file.path);
                fileListModel.push({
                    fileName, storageName, fullPath
                })
            });
            req.body.title && (gisInfoModel.title = req.body.title)
            req.body.describe && (gisInfoModel.describe = req.body.describe)
            req.body.status && (gisInfoModel.status = req.body.status)
            req.body.lngLat && (gisInfoModel.position.lngLat = req.body.lngLat)
            req.body.locationName && (gisInfoModel.position.name = req.body.locationName)
            const updatedModel = await gisInfoModel.save();
            updatedModel && res.json({
                success: true,
                message: "修改成功",
                data: updatedModel.toObject()
            })
            break;
        default:
            //get list
            const gisInfoModels = await GisInfo.find({ account: account });
            res.json({
                message: "获取列表成功",
                success: true,
                data: gisInfoModels.map(info => info.toObject())
            })
            break;
    }
}
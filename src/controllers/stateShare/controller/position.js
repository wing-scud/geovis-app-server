/**
 * 无线累加
 * todo:
 *  1. 优化数据库加载的内容
 *  2. 只保存一段时间内的数据
 */
const StateShare = require('../../../models/stateShare.ts')
const UserSM = require('../../../models/userSM.ts')
async function sendPositions(group) {
    // 筛选组别，从userSM中找到组别  
    const accountModels = await UserSM.find({ group: group }, 'account')
    const accounts = accountModels.map((model) => model.toObject().account)
    //根据用户找到对应位置
    const stateShares = await StateShare.find({ account: { $in: accounts } });
    const members = stateShares.map((stateShare) => {
        const position = stateShare.toObject();
        return position;
    })
    return members
}
async function receivePosition(socket, data) {
    const user = socket.data.user;
    const obj = data;
    const lngLat = obj.position
    const createTime = obj.createTime;
    let stateShare = await StateShare.findOne({ account: user.account })
    if (!stateShare) {
        stateShare = new StateShare({ history: [], account: user.account, position: undefined })
    }
    stateShare.position = lngLat;
    stateShare.history.push({
        position: lngLat,
        createTime: createTime
    })
    // 只需要更新最新更新位置的账户
    stateShare.save(async (error, updatedStateShare) => {
        const position = updatedStateShare.position
        socket.emit('update:memberPosition', { account: updatedStateShare.account, position })
    })
}

module.exports = async function handle(socket) {
    console.log('connected position share')
    socket.on('init:groupPosition', async (data) => {
        const members = await sendPositions("1")
        socket.emit('init:groupPosition', members)
    })
    socket.on('update:selfPosition', (data) => {
        receivePosition(socket, data)
    })
    socket.on('update:group', async (data) => {
        const members = await sendPositions(data.group)
        socket.emit('update:groupPosition', members)
    })
}

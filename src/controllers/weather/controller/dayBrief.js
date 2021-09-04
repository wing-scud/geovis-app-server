
const fetch = require('node-fetch')
const addressConfig = global['CONFIG'].weatherAddress;
const briefAddress = addressConfig.currentWeatherBrief;
/**
 * 参数 id ，表示城市
 * @param {*} request 
 * @param {*} response 
 */
module.exports = async function handle(request, response) {
    const code = request.body.code;
    try {
        const remoteData = await fetch(briefAddress + code + '.html').then((res) => res.json());
        const data = resolveData(remoteData);
        response.status(200).json(data);
    } catch (e) {
        response.status(404).end();
    }
}
const resolveObj = {
    city: "city",
    cityid: "cityCode",
    temp1: "minTemp",
    temp2: "maxTemp",
    weather: "weather",
    // "img1": "img1",
    // "img2": "img2",
    // "ptime": "ptime"
}
function resolveData(data) {
    const remoteInfor = data.weatherinfo;
    const infor = {}
    Object.keys(resolveObj).map((key) => {
        if (key === "temp2" || key === "temp1") {
            remoteInfor[key] = remoteInfor[key].replace(/[^0-9]/ig, "").trim();
        }
        infor[resolveObj[key]] = remoteInfor[key]
    })
    return infor;
}
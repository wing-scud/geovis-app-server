
const fetch = require('node-fetch')
const addressConfig = global['CONFIG'].weatherAddress;
const detailAddress = addressConfig.currentWeatherDetail;
const fifteenAddress = addressConfig['15dayWeather'];
/**
 * 参数 id ，表示城市
 * @param {*} request 
 * @param {*} response 
 */
module.exports = async function handle(request, response) {
    const code = request.body.code;
    try {
        const remoteData = await fetch(detailAddress + code + '.html').then((res) => res.json());
        const fifteenData = await fetch(fifteenAddress + code).then((res) => res.json());
        const otherData = getOtherDataFromFifteen(fifteenData);
        const data = resolveData(remoteData);
        Object.assign(data, otherData);
        response.status(200).json(data);
    } catch (e) {
        response.status(404).end();
    }
}
const resolveObj = {
    city: "city",
    cityid: "cityCode",
    temp: "temp",
    WD: "windDir",
    WS: "windPower",
    SD: "humidity",//28%
    AP: "pressure",
    njd:"describe"
}
// 获取sunrise、sunset、airQuality
function getOtherDataFromFifteen(data) {
    const forecast = data.data.forecast;
    const todayData = forecast[0];
    return {
        sunrise: todayData['sunrise'],
        sunset: todayData['sunset'],
        airQuality: todayData['aqi'],
        weather: todayData['type']
    }
}
function resolveData(data) {
    const remoteInfor = data.weatherinfo;
    const infor = {}
    Object.keys(resolveObj).map((key) => {
        infor[resolveObj[key]] = remoteInfor[key]
    })
    return infor;
}
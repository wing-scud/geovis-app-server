
const fetch = require('node-fetch')
const addressConfig = global['CONFIG'].weatherAddress;
const fifteenAddress = addressConfig['15dayWeather'];
/**
 * 参数 id ，表示城市
 * @param {*} request 
 * @param {*} response 
 */
module.exports = async function handle(request, response) {
    const code = request.body.code;
    try {
        const remoteData = await fetch(fifteenAddress + code).then((res) => res.json());
        const data = resolveData(remoteData);
        response.status(200).json(data);
    } catch (e) {
        response.status(404).end();
    }
}
// const resolveObj = {
//     "shidu": "humidity",
//     "pm25": "pm25",
//     "pm10": "pm10",
//     "quality": "airQuality",
//     "wendu": "temp",
//     "ganmao": "notice",
// }
const resolveObj = {
    "date": "20",
    "high": "maxTemp",
    "low": "minTemp",
    "ymd": "date",
    "week": "week",
    "sunrise": "sunrise",
    "sunset": "sunset",
    "aqi": "airQuality",
    "fx": "windDire",
    "fl": "windPower",
    "type": "weather",
    "notice": "notice"
}

function resolveData(data) {
    const remoteInfor = data.data;
    const forecasts = remoteInfor.forecast
    const infor = []
    forecasts.map((forecast) => {
        const obj = {}
        Object.keys(resolveObj).map((key) => {
            if(key==="low" || key==="high"){
                forecast[key]= forecast[key].replace(/[^0-9]/ig,"").trim();
            }
            obj[resolveObj[key]] = forecast[key];
        })
        infor.push(obj)
    })
    return infor;
}
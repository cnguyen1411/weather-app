const request = require('request');
    var getWeather = (lat,lng,callback) => {
    request({
        url: `https://api.darksky.net/forecast/c0789ffe5103d1b7ec820521848aec4c/${lat},${lng}`,
        json: true
    }, (error,response,body) => {
        if(!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
        else{
            callback('Unable to connect server Forecast.io');
        }
    });
};

module.exports.getWeather = getWeather;
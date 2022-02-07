const request = require('request');

const forecast = (latitude,longitude,callback) => {
  const url='http://api.weatherstack.com/current?access_key=58490d1adcc0003ac8fc2fa298a060c5&query='+ latitude +','+ longitude +'&units=f'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            const currentTemp = body.current.temperature
            const feelTemp =body.current.feelslike
            const  weatherDesc =body.current.weather_descriptions
            callback(undefined,weatherDesc + '. It is currently ' + currentTemp + ' degrees out. It feels like ' + feelTemp + 'degrees out')
        }

    })
}
 module.exports = forecast;
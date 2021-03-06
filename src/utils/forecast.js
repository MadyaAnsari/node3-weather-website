const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url =  'https://api.darksky.net/forecast/e9061534a74bf1f295d0f7db7178c824/' + latitude + ',' + longitude
 
    request({ url, json: true }, (error, { body }) => { 
       if (error) {
          callback('unable to connect to weather services.', undefined)
       } else if (body.error) {
          callback('unable to find location. Try another search', undefined)
       } else {
          callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degree out. This high today is ' + body.daily.data[0].temperatureHigh +  ' with a low of ' + body.daily.data[0].temperatureLow + '. There is '  + body.currently.precipProbability + '% of rain. ' +  'WindSpeed is ' + body.currently.windSpeed)
            }
        
        })
    }
    


module.exports = forecast
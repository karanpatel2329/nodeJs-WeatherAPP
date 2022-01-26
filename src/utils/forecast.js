const request = require('request')

const forecast = (lati, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=92b722ff994fc7c5c640dedf50a27251&query=lat="+lati+"&lon="+long

 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            //console.log(body);
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. The Humidity is ' + body.current.humidity + '.')
        }
    })
}

module.exports = forecast
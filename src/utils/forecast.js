const request = require('postman-request')

//json:true will return a a json body object, so we don't have to parse it
const forecast = (latitude, longitude, callback) =>{
    const weatherUrl = `http://api.weatherstack.com/current?access_key=a2e19c76fca5ccfe651e350ec755656e&query=${latitude},${longitude}`
    request({url: weatherUrl, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to network', undefined)
        } else if(body.error){
            callback(body.error.info, undefined)
        }
        else{
            callback(undefined,`${body.current.weather_descriptions[0]}. Temperature is ${body.current.temperature} degrees, feels like ${body.current.feelslike} degrees`)
        }
    })
}

  module.exports = forecast
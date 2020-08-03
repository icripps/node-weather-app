const request = require('request')




const foreCast = (latitude, longitude, callback) => {
    const access_key = '226ab784a623140e2a421d9045e49465'
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${longitude},${latitude}`
    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback('There is a problem with your internet connection', undefined)
        } else if (body.error) {
            callback(undefined, 'No weather information available for the given coordinates')
        } else {
            const { weather_descriptions: weatherDescription, temperature, feelslike } = body.current
            callback(undefined,
                'Hello, it is currently ' + weatherDescription[0] + '. The temperature is ' + temperature +
                ' degrees but it feels like ' + feelslike + ' degrees.'
            )
        }

    })
}

module.exports = foreCast
const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=28729a141c4a0ef7ff0509d9cd55d819&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Impossibile connettersi alla rete!", undefined)
        } else if (body.error) {
            callback("Indirizzo non trovato. Provare di nuovo", undefined)
        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] +
                ". It is currently " +
                body.current.temperature +
                " degrees. There is " +
                body.current.precip +
                "% chance of rain. Humidity is at " +
                body.current.humidity +
                "%. Wind speed is at " +
                body.current.wind_speed +
                "km/h."
            );
        }
    })
}
module.exports = forecast
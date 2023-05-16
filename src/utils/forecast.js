const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=28729a141c4a0ef7ff0509d9cd55d819&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Impossibile connettersi alla rete!", undefined)
        } else if (body.error) {
            callback("Indirizzo non trovato. Provare di nuovo", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " deegrees out and it feels like " + body.current.feelslike + " deegrees")
        }
    })
}

module.exports = forecast
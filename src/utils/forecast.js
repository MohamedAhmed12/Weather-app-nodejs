const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/15b12f399a4f883f72fbd1e717fb6cd7/' + long + ',' + lat + '?units=si'

    request(
        { url, json: true },
        (error, response, body) => {
            if (error) {
                callback('Unable to connect to weather service!')
            } else if (body.error) {
                callback('Status: ' + body.code + ' error: ' + body.error)
            } else {
                callback(undefined,
                    body.daily.data[0].summary +
                    " it's currently " +
                    body.currently.temperature +
                    " degree out. This high today is " +
                    body.daily.data[0].temperatureHigh +
                    " with a low of " +
                    body.daily.data[0].temperatureLow +
                    ".There is a " +
                    body.currently.precipProbability +
                    "% chance of rain"
                )
            }
        }
    )
}

module.exports = forecast
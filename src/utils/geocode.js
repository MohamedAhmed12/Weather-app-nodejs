const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oYW1lZC1haG1lZCIsImEiOiJjazc1ZjZuejIwMWJyM2tvMXNmMXc5ZjhnIn0.p8cwMq8J5pkwfk0k7VZpBg&limit=1'

    request(
        { url, json: true },
        (error, response, { features } = {}) => {
            if (error) {
                callback('Unable to connect to weather service!')
            } else if (features.length === 0) {
                callback('Unable to find Location, Try another search')
            } else {
                callback(undefined, {
                    lat: features[0].center[1],
                    long: features[0].center[0],
                    location: features[0].place_name
                })

            }
        }
    )
}

module.exports = geocode
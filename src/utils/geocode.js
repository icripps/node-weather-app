const request = require('request')
const geoCode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWNyaXBwcyIsImEiOiJja2Q2NWpycGIwbnA3MnNuemtwY2dueHZxIn0.DgwzUaAFjrhZfu3_ZGf6Aw`
    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback('There is no internet connectivity', undefined)
        } else if (body.features.length === 0) {
            callback(undefined, 'There was no result for Your Query')
        } else {
            const { center, place_name: placeName } = body.features[0]
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location: placeName
            })
        }
    })

}


module.exports = geoCode
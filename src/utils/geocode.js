const request = require('postman-request')

//encodeUriComponent will encode the string so that if a character is used that would normally make the url crash, it would instead encode it to a special character
const geocode = (address, callback) =>{
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWdncGxhbnRzdW5kYWUiLCJhIjoiY2tlNWFvejB1MTFndjJ0c3o4dGJ4cmU4eSJ9.6u_3p-f59G1LhKUQUexS3A&limit=1`
    request({url: geoUrl, json:true}, (error, {body} ={}) =>{
        //low level error handler also specified in case a error occurs but not response
        //e.g. if no network connection
        if(error){
            callback('Unable to connect to network!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location, please try another search', undefined)
        }
        else{
            //callback function for response if successful, so we want error undefined. 
            //we also want to return more than one value, so return an object
            callback(undefined, {
                location: body.features[0].place_name, 
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode
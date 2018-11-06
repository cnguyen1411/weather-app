const request = require('request');

var geoAddress = (address, callback) => {
    var encodeAdds = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdds}&key=AIzaSyDQgGbJEz2pFs4-hu29YqQvOn3hWlQYG14`,
        json: true
    }, (error,response,body) => {
        if(!error && response.statusCode === 200){
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longtitude: body.results[0].geometry.location.lng
            });
        }else{
            callback('Unable to connect Google server');
        }
    });
};

module.exports.geoAddress = geoAddress;
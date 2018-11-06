const express = require('express');
const bodyParser = require('body-parser');
//const geocodeAdds = require('./geocode/geocode.js');
const weather = require('./weather/weather-app.js');
const axios = require('axios');

var ads;

//const exphbs = require('express-handlebars');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public_html'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.route('/')
    .get((req,res) => {
        res.render('weather.hbs');
    })
    .post((req,res) => {
        ads = '\n' + req.body.address+' '+req.body.city+' '+req.body.state+' '+req.body.zipcode+' '+req.body.country;
        console.log(ads);
        console.log('\n');

    var encodeAdds = encodeURIComponent(ads);
    geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdds}&key=AIzaSyDQgGbJEz2pFs4-hu29YqQvOn3hWlQYG14`;
    axios.get(geocodeUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that Address');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/c0789ffe5103d1b7ec820521848aec4c/${lat},${lng}`;
        //console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
        }).then((response) => {
            res.render('result.hbs', {
                address: ads,
                temperature: response.data.currently.temperature,
                apparentTemperature: response.data.currently.apparentTemperature,
                summary: response.data.currently.summary
            });
            var temperature = response.data.currently.temperature;
            var apparentTemperature = response.data.currently.apparentTemperature;
            var summary = response.data.currently.summary;
        console.log(`Currently: ${temperature}, Feels like ${apparentTemperature}, Outside ${summary}`);
        }).catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API');
        }
        else{
            console.log(e.message);
        }
    });

});


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
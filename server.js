const express = require('express');
const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public_html'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.route('/login')
    .get((req,res) => {
        res.render('login.hbs');
    })
    .post((req,res) => {
        console.log(req.body);
         res.render('login.hbs',{
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        })
    });

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
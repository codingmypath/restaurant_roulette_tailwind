require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const fetch = require('node-fetch');
const yelp = require('yelp-fusion');
const ejs = require('ejs');

app.set(express.static('public'));


const api_key = process.env.API_KEY;

app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'build')));

// app.use(bodyParser.urlencoded ({
//   extended: true
// }));

// app.use(bodyParser.json());


//route for index page
app.get("/", function (req, res) {
  res.render("index");
});


const port = process.env.PORT || 3009;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

let restaurant,
    cityInput, 
    price,
    category,
    num = 0;

app.get('/selection', (req, res) => {
    console.log('running')
    cityInput = req.query.cityInput;
    price = req.query.price;
    category = req.query.category;
    
    console.log("category:" + category)

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      Authorization: `Bearer ${api_key}`
      }
    };
    
    fetch(`https://api.yelp.com/v3/businesses/search?location=${cityInput}&categories=${category}&price=${price}&sort_by=best_match&limit=50&offset=200`, options)
      .then(response => response.json())
      .then(response => {
        num = Math.floor(Math.random() * (Object.keys(response.businesses).length));
        console.log(response.businesses[num])
        console.log("Number of Choices: " + (Object.keys(response.businesses).length))
        console.log("random number: " + num)
        restaurant = response.businesses[num]
        res.render('rest', {
          restaurant: restaurant
        })
        // res.status(200).send(response);
      })
      .catch(err => {
        res.status(401).send(err);
        console.error(err)
      });
});



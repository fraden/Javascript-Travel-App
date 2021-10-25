// define variables
const port = 8081;
let projectData = {};

// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
// source: https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
// source: https://expressjs.com/de/starter/static-files.html
app.use(express.static('dist'));

// Spin up the server
// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
}); // source: Lesson 2.6 in course
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Post Route

app.post('/data', function(req, res) {
    projectData['lat'] = req.body.lat;
    projectData['lng'] = req.body.lng;
    projectData['country'] = req.body.country;
    projectData['city'] = req.body.city;
});

app.post('/forecast', function(req, res) {
    projectData['high'] = req.body.high;
    projectData['low'] = req.body.low;
    projectData['description'] = req.body.description;
});

app.post('/image', function(req, res) {
    projectData['imageUrl'] = req.body.imageUrl;
});
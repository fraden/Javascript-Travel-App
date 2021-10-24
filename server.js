// define variables
const port = 7272;
const project_folder = 'website';
var projectData = {};

// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');
// Start up an instance of app
var app = express();

/* Dependencies */
var bodyParser = require('body-parser');
var cors = require('cors');

/* Middleware*/
// source: https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
// source: https://expressjs.com/de/starter/static-files.html
app.use(express.static(project_folder));

// Spin up the server
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) }) // source: Lesson 2.6 in course
    // Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
    res.send(projectData);
})

// Post Route

app.post('/data', function(req, res) {
    projectData['temperature'] = req.body.temperature;
    projectData['date'] = req.body.date;
    projectData['userResponse'] = req.body.userResponse;
});
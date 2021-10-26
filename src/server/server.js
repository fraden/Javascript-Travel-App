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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
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
    console.log('projectData');
    console.log(projectData);
    res.send(projectData);
});

// Post Route
app.post('/allData', function(req, res) {
    projectData = req.body;
    console.log('data received');
    console.log('projectData:');
    console.log(projectData);
});
require('babel-register');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS requests
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, x-access-token');
  // intercept OPTIONS method
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

// require dot env
// require('dotenv').config();
require('dotenv').load();



const initRoutes = require('./app/routes');
// Require our routes into the application.
initRoutes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;

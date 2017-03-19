"use strict";

// Dependencies               ==================================================
let express     = require('express');
let app         = express();
let bodyParser  = require('body-parser'); // to get params from POST requests
let config      = require('./config'); // get our config file
let mail        = require('./mail'); // to send email
let mongo       = require('./mongo'); // get our mongo utils

// Initialization            ==================================================
let jsonParser  = bodyParser.json();
config.initializeExpress(app, express, bodyParser); // Load Express Configuration
mongo.connect(config.database); // connecting to MongoDB

// new way
app.get('/activate/:tp', (req, res) => {
  var tradepoint = req.params.tp;
  console.log(tradepoint);
//app.get("/sports/:name", (request, response) => {
//let sportName = request.params.name;
  //res.sendStatus(200);
  res.json( [{"tp":"6314СК4121", "name":"ООО Евродизайн", "wp":"063ТС00214", "tradepoint":"Мягкофф", "address":"г. Самара, ул. Революционная, д. 70", "city":"Самара"}] );

});

// API routes                 ==================================================
let apiRoutes = express.Router(); // get an instance of the router for api routes
require('./routes/auth')(app, apiRoutes); // auth routes
// route to show welcome message
apiRoutes.get('/', (req, res) => {  res.json({ message: 'rfbGO API' }); });
//require('./routes/users')(apiRoutes, jsonParser, Mongo, Mail); // users routes
//require('./routes/orders')(apiRoutes, jsonParser, Mongo, Mail); // orders routes

// Apply the API routes       ==================================================
app.use('/api', apiRoutes);

// Start the server           ==================================================
app.listen(config.port, () => console.log( "App is on port " + config.port ) );

"use strict";

// Dependencies               ==================================================
let express     = require('express');
let app         = express();
let bodyParser  = require('body-parser'); // to get params from POST requests
let config      = require('./config'); // get our config file
let mail        = require('./mail'); // to send email
let mongo       = require('./mongo'); // get our mongo utils

let socket      = require('./routes/socket.js');
let server      = require('http').Server(app);
let io          = require('socket.io')(server); // Hook socket.io into Express
//var io          = require('socket.io').listen(app); // Fuck it!

// Initialization            ==================================================
let jsonParser  = bodyParser.json();
config.initializeExpress(app, express, bodyParser); // Load Express Configuration
mongo.connect(config.database); // connecting to MongoDB

// easy activation?
app.get('/activate/:tp', (req, res) => {
  let tp = req.params.tp;
  let tradepoints = mongo.tradepoints();

  tradepoints.find({"tp":tp}, {"_id":false}).toArray((err, docs) => {
    if(err) { res.sendStatus(400); }
    res.json( docs );
  });
});
// admin console
app.get("/users", (req, res) => {
  let users = mongo.users();

  users.find({}).toArray((err, docs) => {
    if(err) { res.sendStatus(400); }
    res.json( docs );
  });
});

// Socket.io Communication
io.sockets.on('connection', socket);

// API routes                 ==================================================
let apiRoutes = express.Router(); // get an instance of the router for api routes
require('./routes/auth')(app, apiRoutes); // auth routes
// route to show welcome message
apiRoutes.get('/', (req, res) => {  res.json({ message: 'rfbGO API' }); });
//require('./routes/users')(apiRoutes, jsonParser, Mongo, Mail); // users routes
//require('./routes/orders')(apiRoutes, jsonParser, Mongo, Mail); // orders routes

apiRoutes.get("/tradepoints", (req, res) => {
  let city = req.query.city || {};
  let role = req.query.role || {};
  let tradepoints = mongo.tradepoints();

  if (role == 0) {
    tradepoints.aggregate([{$match : {"city":city}}, {$group : { _id : "$wp", wp:{$first:"$wp"}, tradepoint:{$first:"$tradepoint"}, address:{$first:"$address"}, city:{$first:"$city"}}}]).toArray((err, docs) => {
      if(err) { res.sendStatus(400); }
      res.json( docs );
    });
  } else if (role == 1) {
    tradepoints.find({"city":city}, {"_id":false}).toArray((err, docs) => {
      if(err) { res.sendStatus(400); }
      res.json( docs );
    });
  }
});

// Apply the API routes       ==================================================
app.use('/api', apiRoutes);

// Start the server           ==================================================
app.listen(config.port, () => console.log( "App is on port " + config.port ) );

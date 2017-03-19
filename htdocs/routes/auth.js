"use strict";

let jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
let mongoose    = require('mongoose');
let request    = require('request');

let Config      = require('./../config'); // get our config file
let User        = require('./user'); // get our mongoose model

mongoose.connect(Config.database); // connect to MongoDB through Mongoose
mongoose.Promise = global.Promise; // WTF???

module.exports = function(app, apiRoutes) {
  // new way
  app.get('/activate/:tp', (req, res) => {
    var tradepoint = req.params.tp;
    console.log(tradepoint);
//app.get("/sports/:name", (request, response) => {
//let sportName = request.params.name;
    //res.sendStatus(200);
    res.json( [{"tp":"6314СК4121", "name":"ООО Евродизайн", "wp":"063ТС00214", "tradepoint":"Мягкофф", "address":"г. Самара, ул. Революционная, д. 70", "city":"Самара"},
    {"tp":"631H323884", "name":"ООО Мебель 5+", "wp":"063ТС00214", "tradepoint":"Мягкофф", "address":"г. Самара, ул. Революционная, д. 70", "city":"Самара"}] );


  });

  apiRoutes.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        //res.json({ success: false, message: 'Authentication failed. Wrong creditenials' });
        return res.status(401).send({ success: false, message: 'Authentication failed. Wrong credentials' }); // User not found
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          //res.json({ success: false, message: 'Authentication failed. Wrong creditenials' });
          return res.status(401).send({ success: false, message: 'Authentication failed. Wrong credentials' }); // Wrong password
        }
        // if user is found and password is right then create a token
        console.log(user);
        var token = jwt.sign(user, Config.secret, { expiresIn: 1440 }); // expires in 24 hours
        //res.send({ token: token });
        res.json({ success: true, message: 'Token created',
                   user: {email: user.email, name: user.name, phone: user.phone,
                          city: user.city, tradepoint: user.tradepoint,
                          role: user.role},
                   token: token });
      });
    });
  });

  apiRoutes.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ success: false, message: 'Email is already taken' });
      }
      if (!req.body.email || !req.body.password) {
        return res.status(400).send({ success: false, message: 'Bad credentials' });
      }
      var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        city: req.body.city,
        tradepoint: {},
        role: req.body.role
      });
      user.save(function(err, result) {
        if (err) { res.status(500).send({ success: false, message: err.message }); }
        else {
          var token = jwt.sign(user, Config.secret, { expiresIn: 1440 }); // expires in 24 hours
          res.json({ success: true, message: 'User & token created',
                     user: {email: user.email, name: user.name, phone: user.phone,
                            city: user.city, tradepoint: user.tradepoint,
                            role: user.role},
                     token: token });
        }
      });
    });
  });

  // route middleware to verify a token
  apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      // verifies secret and checks expiration
      jwt.verify(token, Config.secret, function(err, decoded){
        if (err) {
          return res.status(401).send({ success: false, message: 'Failed to authenticate token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token return an error
      return res.status(401).send({ success: false, message: 'No token provided' });
    }
  });

  // admin console
  //apiRoutes.get("/console", (req, res) => {
  //  User.find({}, (err, docs) => { if(err) { res.sendStatus(400); } res.json(docs); });
  //});
}

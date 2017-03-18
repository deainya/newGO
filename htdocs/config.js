"use strict";

//let morgan = require('morgan'); // for logging requests to the console

module.exports = {
  port: process.env.port || 3005,
  'secret': 'secretforrfbgoinitiative',

  //'smpts': 'smtps://deainru%40gmail.com:mail4deainru@smtp.gmail.com',
  'smtps': {
    service: 'Gmail',
    auth: { user: 'deainru', pass: 'mail4deainru' },
    logger: {}, // hz
    debug: false // include SMTP traffic in the logs
  },
  'defaultfields': {
    from: '"rfbGO" <rfbGO@deain.ru>',
    subject: 'Оповещение rfbGO ✔',
  },

  database: //'mongodb://user:pass@localhost:27017/rfbgo-dev',
            'mongodb://user:pass@localhost:27017/partnergo-dev',

  initializeExpress: function(app, express, bodyParser) {
    app.use(bodyParser.json()); // get our request parameters
    app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(express.cookieParser()); // read cookies (needed for auth)
    //app.use(morgan('dev')); // use morgan to log requests to the console
    app.use( express.static(__dirname + "/../client") ); // default route
  }
};

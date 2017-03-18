"use strict";

let config      = require('./config'); // get our config file
let bunyan      = require('bunyan'); // simple json logger
let nodemailer  = require('nodemailer'); // send emails

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: config.mailauth,
    logger: bunyan.createLogger({ name: 'nodemailer' }),
    debug: false // include SMTP traffic in the logs
  }, config.maildefaults);

module.exports = {
  sendMail(mail_to, message, htmlmessage){
    if (!htmlmessage) {
      var mailOptions = { to: mail_to, text: message, html: message };
    } else {
      var mailOptions = { to: mail_to, text: message, html: htmlmessage };
    }
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) { return console.log(err.message); } else {
        transporter.close();
        return console.log("The letter has been sent. %s", info.response);
      }
    });
  }
}

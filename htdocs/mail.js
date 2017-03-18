"use strict";

let config      = require('./config'); // get our config file
let nodemailer  = require('nodemailer'); // send emails

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config.smtps, config.defaultfields);

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

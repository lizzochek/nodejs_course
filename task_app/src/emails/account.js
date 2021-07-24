"use strict";

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "littled685@gmail.com",
    subject: "Thanks for joining!",
    text: `Welcome to the app, ${name}! Let me know how you get along with the app :)`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "littled685@gmail.com",
    subject: "So sorry you left!",
    text: `Goodbye, ${name}! Hope to see you again. Is there anything that can be improved?`,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};

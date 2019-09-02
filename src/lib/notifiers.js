const fs = require('fs');
const Handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const utilities = require('./utilities');

const headerTemplate = fs.readFileSync(`${__dirname}/../templates/header.hbs`, 'utf-8');
const footerTemplate = fs.readFileSync(`${__dirname}/../templates/footer.hbs`, 'utf-8');
const emailTemplate = fs.readFileSync(`${__dirname}/../templates/email-notification.hbs`, 'utf-8');
Handlebars.registerPartial('header', headerTemplate);
Handlebars.registerPartial('footer', footerTemplate);
Handlebars.registerHelper('equals', (arg1, arg2, options) => (arg1 == arg2) ? options.fn(this) : options.inverse(this));
const template = Handlebars.compile(emailTemplate);

function sendGmail(to, endpoint, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SYSTEM_GMAIL_EMAIL,
      pass: process.env.SYSTEM_GMAIL_PASSWORD
    },
  });
  const mailOptions = {
    from: 'joshterrill.dev@gmail.com',
    to,
    subject: `Heartbeat Status Message: ${endpoint.url}`,
    html: template({
      url: endpoint.url,
      status: endpoint.status,
      dateTime: utilities.formatDate(new Date()),
      message,
    }),
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending mail from sendGmail()', error);
      return;
    }
  });
}

module.exports = {
  sendGmail,
}
const nodemailer = require('nodemailer');
const utilities = require('./utilities');

const { emailNotificationTemplate } = require('./templates');

async function sendGmail(to, endpoint, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SYSTEM_GMAIL_EMAIL,
      pass: process.env.SYSTEM_GMAIL_PASSWORD
    },
  });
  const mailOptions = {
    from: process.env.SYSTEM_GMAIL_EMAIL,
    to,
    subject: `Heartbeat Status Message: ${endpoint.url}`,
    html: emailNotificationTemplate({
      url: endpoint.url,
      status: endpoint.status,
      dateTime: utilities.formatDate(new Date()),
      message,
    }),
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error('Error sending mail from sendGmail()', error);
      return;
    }
    endpoint.dateTimeOfLastNotification = new Date();
    return await endpoint.save();
  });
}

module.exports = {
  sendGmail,
}
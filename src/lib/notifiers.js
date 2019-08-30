const nodemailer = require('nodemailer');

function sendGmail(to, endpoint, message) {
  console.log('sendGmail', to, endpoint, message);
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
    subject: `Received message regarding ${endpoint.url}`,
    html: `<p>URL: ${endpoint.url}</p><p>Message: ${message}</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log('sendmailresponse', info, error);
    if (error) {
      console.error('Error sending mail from sendGmail()', error);
      return;
    }
  });
}

module.exports = {
  sendGmail,
}
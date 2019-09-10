const fs = require('fs');
const Handlebars = require('handlebars');

function buildEmailNotificationTemplate() {
  const headerTemplate = fs.readFileSync(`${__dirname}/../templates/header.hbs`, 'utf-8');
  const footerTemplate = fs.readFileSync(`${__dirname}/../templates/footer.hbs`, 'utf-8');
  const emailTemplate = fs.readFileSync(`${__dirname}/../templates/email-notification.hbs`, 'utf-8');
  Handlebars.registerPartial('header', headerTemplate);
  Handlebars.registerPartial('footer', footerTemplate);
  Handlebars.registerHelper('equals', (arg1, arg2, options) => (arg1 == arg2) ? options.fn(this) : options.inverse(this));
  return Handlebars.compile(emailTemplate);
}

module.exports = {
  emailNotificationTemplate: buildEmailNotificationTemplate(),
}
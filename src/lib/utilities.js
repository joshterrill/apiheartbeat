const bcrypt = require('bcrypt');

function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function createSignObjects(email) {
  return {
    issuer:  process.env.JWT_ISSUER,
    subject:  email,
    audience: process.env.JWT_AUDIENCE,
    expiresIn:  (Math.floor(Date.now() / 1000) + (60 * 60)) * 3, // 3 hours
  };
}

function beginningOfDay() {
  const start = new Date();
  start.setHours(0,0,0,0);
  return start;
}

function endOfDay() {
  const end = new Date();
  end.setHours(23,59,59,999);
  return end;
}

function last24Hours() {
  return new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
}

function formatDate(dateVal) {
  const newDate = new Date(dateVal);

  const sMonth = padValue(newDate.getMonth() + 1);
  const sDay = padValue(newDate.getDate());
  const sYear = newDate.getFullYear();
  let sHour = newDate.getHours();
  const sMinute = padValue(newDate.getMinutes());
  let sAMPM = 'AM';

  const iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
      sAMPM = 'PM';
      sHour = iHourCheck - 12;
  }
  else if (iHourCheck === 0) {
      sHour = '12';
  }

  sHour = padValue(sHour);

  return sMonth + '/' + sDay + '/' + sYear + ' ' + sHour + ':' + sMinute + ' ' + sAMPM;
}

function padValue(value) {
  return (value < 10) ? '0' + value : value;
}

module.exports = {
  encryptPassword,
  comparePassword,
  createSignObjects,
  beginningOfDay,
  endOfDay,
  last24Hours,
  formatDate,
  padValue,
}

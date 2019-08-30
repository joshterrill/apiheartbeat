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

module.exports = {
  encryptPassword,
  comparePassword,
  createSignObjects,
  beginningOfDay,
  endOfDay,
  last24Hours,
}

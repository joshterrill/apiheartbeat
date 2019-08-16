const level = require('level');
const db = level('../db');

module.exports = {
  get: (key) => {
    return new Promise((resolve, reject) => {
      db.get(key, (err, value) => {
        if (typeof JSON.parse(value) === 'object') {
          value = JSON.parse(value);
        }
        if (err) reject(err);
        resolve(value);
      });
    });
  },
  put: (key, value) => {
    return new Promise((resolve, reject) => {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      db.put(key, value, (err) => {
        if (err) reject(err);
        resolve({key, value});
      });
    });
  },
}

const Router = require('express').Router;
const version = require('../../package.json').version;

module.exports = () => {
  const api = Router();

  api.get('/', (req, res) => {
    res.json({version});
  });

  return api;

}
const Router = require('express').Router;
const EndpointService = require('./endpoint.service');

module.exports = () => {
  const api = Router();

  api.post('/check', async (req, res) => {
    try {
      const endpoint = req.body;
      const check = await EndpointService.checkEndpoint(endpoint);
      res.json(check);
    } catch (error) {
      res.json(error);
    }
  });
  api.post('/save', async (req, res) => {
    try {
      const endpoint = req.body;
      const save = await EndpointService.saveEndpoint(endpoint);
      res.json(save);
    } catch (error) {
      res.json(error);
    }
  });

  return api;
}

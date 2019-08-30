const Router = require('express').Router;
const EndpointService = require('./endpoint.service');

module.exports = () => {
  const api = Router();

  api.post('/check', EndpointService.checkEndpoint);
  api.post('/save', EndpointService.saveEndpoint);

  return api;
}

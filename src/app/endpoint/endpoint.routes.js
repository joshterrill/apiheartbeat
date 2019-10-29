const Router = require('express').Router;
const EndpointService = require('./endpoint.service');
const EndpointModel = require('../../models/Endpoint');

module.exports = () => {
  const api = Router();

  api.get('/fetch', async (req, res) => {
    try {
      const endpoints = await EndpointService.getEndpoints(req.tokenData._id);
      res.json(endpoints);
    } catch (error) {
      res.json(error);

    }
  });
  api.post('/save', async (req, res) => {
    try {
      const endpoint = req.body;
      const save = await EndpointService.saveEndpoint(endpoint, req.tokenData._id);
      res.json(save);
    } catch (error) {
      res.json(error);
    }
  });
  api.put('/status/:endpointId', async (req, res) => {
    try {
      const { endpointId } = req.params;
      const { isActive } = req.body;
      const update = await EndpointService.updateEndpointStatus(endpointId, isActive);
      res.json(update);
    } catch (error) {
      res.json(error);
    }
  });
  api.delete('/delete/:endpointId', async (req, res) => {
    try {
      const { endpointId } = req.params;
      const deleteEndpoint = await EndpointService.deleteEndpoint(endpointId);
      res.json(deleteEndpoint);
    } catch (error) {
      res.json(error);
    }
  });
  api.post('/check/:endpointId', async (req, res) => {
    try {
      const { endpointId } = req.params;
      const endpoint = await EndpointModel.findById(endpointId);
      const check = await EndpointService.checkEndpoint(endpoint);
      res.json(check);
    } catch (error) {
      res.json(error);
    }
  });
  api.get('/messages/:endpointId?', async (req, res) => {
    try {
      const { endpointId } = req.params;
      const { loadAll } = req.query;
      const messages = await EndpointService.getMessages(req.tokenData._id, endpointId, loadAll);
      res.json(messages);
    } catch (error) {
      res.json(error);
    }
  });

  return api;
}

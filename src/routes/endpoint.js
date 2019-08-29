const Router = require('express').Router;
const heartbeat = require('../lib/heartbeat');
const EndpointModel = require('../models/Endpoint');

module.exports = () => {
  const api = Router();

  api.post('/check', async (req, res) => {
    const endpoint = req.body;
    try {
      const heartbeatRes = await heartbeat.checkHeartbeat(endpoint);
      res.json(heartbeatRes);
    } catch (error) {
      res.json({ok: false, message: error.message});
    }
  });

  api.post('/save', async (req, res) => {
    try {
      const data = req.body;
      await EndpointModel.create({
        ...data,
        createdOn: new Date(),
        nextHeartbeatDate: new Date(),
        isActive: true,
        userId: req.token._id,
      });
      res.json({ok: true, message: 'Saved new endpoint'});
    } catch (error) {
      res.json({ok: false, message: error.message});
    }
  });

  return api;

}